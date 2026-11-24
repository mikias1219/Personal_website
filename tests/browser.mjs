// Browser smoke test for the redesigned site. Needs a built app running at TEST_BASE_URL
// (default http://127.0.0.1:3300) and a Chrome binary at CHROME_PATH (default /usr/bin/google-chrome).
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3300";
const tags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
await fs.mkdir("reports", { recursive: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "light",
});
const page = await context.newPage();
const errors = [];
const results = [];
page.on("pageerror", (error) => errors.push(error.message));

const audit = async (label) => {
  const r = await new AxeBuilder({ page }).withTags(tags).analyze();
  results.push({
    route: label,
    violations: r.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  });
};
const overflow = () =>
  page.evaluate(() => document.documentElement.scrollWidth > innerWidth);

try {
  // 1. Every route responds and passes the accessibility audit.
  for (const route of [
    "/",
    "/work/selamnew-workspace",
    "/work/knowledge-hub",
    "/work/okde",
    "/work/banglachatpro",
    "/experience",
    "/certifications",
    "/missing-page",
  ]) {
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    if (response.status() !== (route === "/missing-page" ? 404 : 200))
      throw new Error(`Wrong status at ${route}`);
    await audit(route);
  }

  // 2. Certificates: filter by issuer.
  await page.goto(base + "/certifications", { waitUntil: "networkidle" });
  if ((await page.locator(".cert-record").count()) !== 6) throw new Error("Six credentials missing");
  await page.getByRole("button", { name: /^DataCamp/ }).click();
  if ((await page.locator(".cert-record").count()) !== 4) throw new Error("DataCamp filter failed");
  await page.getByRole("button", { name: /^Microsoft/ }).click();
  if ((await page.locator(".cert-record").count()) !== 2) throw new Error("Microsoft filter failed");

  // 3. Home page content and navigation.
  await page.goto(base, { waitUntil: "networkidle" });
  for (const id of ["work", "about", "experience", "skills", "credentials", "contact", "ask"])
    if ((await page.locator(`#${id}`).count()) !== 1) throw new Error(`Missing section: ${id}`);
  const text = await page.locator("main").textContent();
  for (const content of ["Prodigy InfoTech", "AI GTP", "Atlas Group", "Jenkins", "Redux", "Jun 2020 – Jul 2024", "Data Engineer"])
    if (!text.includes(content)) throw new Error(`Missing content: ${content}`);
  await page.evaluate(() => (window.__marker = "same-document"));
  for (const label of ["About", "Skills", "Experience", "Credentials"]) {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label, exact: true }).click();
    await page.waitForFunction((id) => location.hash === `#${id}`, label.toLowerCase());
    if ((await page.evaluate(() => window.__marker)) !== "same-document")
      throw new Error("Section link reloaded the document");
  }

  // 4. More projects: filter and expand.
  const archive = page.locator("#all-projects");
  await archive.scrollIntoViewIfNeeded();
  if ((await archive.locator(".project-item").count()) !== 6) throw new Error("Expected 6 projects before expanding");
  await archive.getByRole("button", { name: /^Show all/ }).click();
  if ((await archive.locator(".project-item").count()) !== 13) throw new Error("Expected 13 more projects");
  await archive.getByRole("button", { name: "Mobile", exact: true }).click();
  if ((await archive.locator(".project-item").count()) !== 3) throw new Error("Mobile projects missing");

  // 5. Chat in the hero: mocked streaming answer, then the real local fallback.
  await page.route("**/api/chat", (r) =>
    r.fulfill({
      status: 200,
      contentType: "application/x-ndjson",
      body:
        [
          { type: "text", text: "Knowledge Hub uses Azure AI Search." },
          { type: "sources", sources: [{ label: "Knowledge Hub", href: "/work/knowledge-hub" }] },
          { type: "done" },
        ].map((e) => JSON.stringify(e)).join("\n") + "\n",
    }),
  );
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "What has he built with Azure AI?" }).click();
  await page.locator("#ask .msg-sources").getByRole("link", { name: "Knowledge Hub" }).waitFor();
  await page.unroute("**/api/chat");
  await page.locator("#portfolio-question").fill("What is his current role?");
  await page.locator("#ask").getByRole("button", { name: "Send question" }).click();
  await page.locator("#ask").getByText("saved portfolio facts").waitFor();
  if (!(await page.locator("#ask").innerText()).includes("Software Engineer"))
    throw new Error("Data-only assistant did not answer");

  // 6. Floating chat appears once the hero chat is off screen, and focus returns to it on Escape.
  await page.locator("#contact").scrollIntoViewIfNeeded();
  const launcher = page.getByRole("button", { name: "Ask about Mikias" });
  await launcher.click();
  await page.getByRole("dialog").waitFor();
  await page.locator("#floating-question").waitFor();
  await page.keyboard.press("Escape");
  if (!(await launcher.evaluate((e) => e === document.activeElement))) throw new Error("Chat focus not restored");

  // 7. Contact form: validation, then the email-app fallback keeps the draft.
  await page.getByRole("button", { name: "Send message" }).click();
  await page.locator("#name-error").waitFor();
  await page.locator("#contact-name").fill("Example Recruiter");
  await page.locator("#contact-email").fill("test@example.com");
  await page.locator("#contact-message").fill("A draft preserved when delivery is unavailable.");
  await page.route("**/api/contact", (r) =>
    r.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "Direct delivery unavailable." }) }),
  );
  await page.getByRole("button", { name: "Send message" }).click();
  await page.getByRole("link", { name: "Send with your email app" }).waitFor();
  if (!(await page.locator("#contact-message").inputValue()).includes("A draft preserved"))
    throw new Error("Form lost draft");
  await page.unroute("**/api/contact");

  // 8. Themes: toggle persists, and both themes pass the audit.
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: "reports/home-light-desktop.png", fullPage: true });
  await page.getByRole("button", { name: "Switch between light and dark theme" }).click();
  await page.reload({ waitUntil: "networkidle" });
  if ((await page.locator("html").getAttribute("data-theme")) !== "dark") throw new Error("Theme did not persist");
  await audit("home dark");
  await page.screenshot({ path: "reports/home-dark-desktop.png", fullPage: true });

  // 9. Legacy URLs still land on the right section.
  for (const [old, hash] of [["/about", "#about"], ["/contact", "#contact"], ["/work", "#all-projects"]]) {
    await page.goto(base + old, { waitUntil: "networkidle" });
    if (new URL(page.url()).pathname !== "/" || new URL(page.url()).hash !== hash)
      throw new Error(`Legacy section URL failed: ${old}`);
  }

  // 10. Mobile: no sideways scroll, menu works, reduced motion is respected.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: "reports/home-mobile.png", fullPage: true });
  if (await overflow()) throw new Error("Mobile overflow on home");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "About", exact: true }).click();
  await page.waitForFunction(() => location.hash === "#about");
  if (await page.locator("#mobile-nav").count()) throw new Error("Mobile menu did not close");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  await audit("home mobile reduced motion");
  await page.goto(base + "/certifications", { waitUntil: "networkidle" });
  if (await overflow()) throw new Error("Certificates mobile overflow");
  await audit("certifications mobile");

  await fs.writeFile("reports/browser.json", JSON.stringify({ results, errors }, null, 2));
  console.log(JSON.stringify({
    checks: results.length,
    accessibilityViolations: results.reduce((n, r) => n + r.violations.length, 0),
    browserErrors: errors,
  }, null, 2));
  if (errors.length || results.some((r) => r.violations.length)) process.exitCode = 1;
} finally {
  await browser.close();
}
