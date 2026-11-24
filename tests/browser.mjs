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
    violations: r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  });
};
const overflow = () =>
  page.evaluate(() => document.documentElement.scrollWidth > innerWidth);

try {
  for (const route of [
    "/",
    "/work/selamnew-collaboration",
    "/work/workforce-intelligence",
    "/work/okde",
    "/work/azure-ai-solution",
    "/experience",
    "/certifications",
    "/missing-page",
  ]) {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    if (response.status() !== (route === "/missing-page" ? 404 : 200))
      throw new Error(`Wrong status at ${route}`);
    await audit(route);
  }

  await page.goto(base + "/certifications", { waitUntil: "networkidle" });
  if ((await page.locator("[id^=credential-]").count()) !== 6)
    throw new Error("Six credentials missing");
  await page.getByRole("button", { name: /^DataCamp/ }).click();
  if ((await page.locator("[id^=credential-]").count()) !== 4)
    throw new Error("DataCamp filter failed");
  await page.getByRole("button", { name: /^Microsoft/ }).click();
  if ((await page.locator("[id^=credential-]").count()) !== 2)
    throw new Error("Microsoft filter failed");

  await page.goto(base, { waitUntil: "networkidle" });
  for (const id of [
    "work",
    "about",
    "experience",
    "skills",
    "credentials",
    "contact",
    "ask",
  ])
    if ((await page.locator(`#${id}`).count()) !== 1)
      throw new Error(`Missing section: ${id}`);
  const text = await page.locator("main").textContent();
  for (const content of [
    "Prodigy InfoTech",
    "AI GTP",
    "Atlas Group",
    "Jenkins",
    "Redux",
    "Jun 2020 – Jul 2024",
    "Data Engineer",
  ])
    if (!text.includes(content)) throw new Error(`Missing content: ${content}`);

  await page.evaluate(() => (window.__marker = "same-document"));
  for (const label of ["About", "Skills", "Experience", "Credentials"]) {
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: label, exact: true })
      .click();
    await page.waitForFunction(
      (id) => location.hash === `#${id}`,
      label.toLowerCase(),
    );
    if ((await page.evaluate(() => window.__marker)) !== "same-document")
      throw new Error("Section link reloaded the document");
  }

  // Curated work: exactly five project cards (2 company, 3 personal).
  const cards = page.locator("#work article");
  await cards.first().scrollIntoViewIfNeeded();
  if ((await cards.count()) !== 5)
    throw new Error(`Expected 5 curated project cards, found ${await cards.count()}`);

  await page.route("**/api/chat", (r) =>
    r.fulfill({
      status: 200,
      contentType: "application/x-ndjson",
      body:
        [
          { type: "text", text: "OKDE uses queued document ingestion." },
          {
            type: "sources",
            sources: [{ label: "OKDE", href: "/work/okde" }],
          },
          { type: "done" },
        ]
          .map((e) => JSON.stringify(e))
          .join("\n") + "\n",
    }),
  );
  await page.goto(base, { waitUntil: "networkidle" });
  await page
    .locator("#ask")
    .getByRole("button", { name: "What has he built with Azure AI?" })
    .click();
  await page.getByRole("dialog").waitFor();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "OKDE" })
    .waitFor();
  await page.unroute("**/api/chat");
  await page.locator("#floating-question").fill("What is his current role?");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Send question" })
    .click();
  await page.getByRole("dialog").getByText(/From portfolio records|Tech \/ Product Engineer|Software Engineer/).waitFor();

  await page.keyboard.press("Escape");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  const launcher = page.getByRole("button", { name: "Ask about Mikias" });
  await launcher.click();
  await page.getByRole("dialog").waitFor();
  await page.locator("#floating-question").waitFor();
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "Send message" }).click();
  await page.locator("#name-error").waitFor();
  await page.locator("#contact-name").fill("Example Recruiter");
  await page.locator("#contact-email").fill("test@example.com");
  await page
    .locator("#contact-message")
    .fill("A draft preserved when delivery is unavailable.");
  await page.route("**/api/contact", (r) =>
    r.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Direct delivery unavailable." }),
    }),
  );
  await page.getByRole("button", { name: "Send message" }).click();
  await page.getByRole("link", { name: "Send with your email app" }).waitFor();
  if (
    !(await page.locator("#contact-message").inputValue()).includes(
      "A draft preserved",
    )
  )
    throw new Error("Form lost draft");
  await page.unroute("**/api/contact");

  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({
    path: "reports/home-light-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: /Switch to dark mode/i }).click();
  await page.reload({ waitUntil: "networkidle" });
  if ((await page.locator("html").getAttribute("data-theme")) !== "dark")
    throw new Error("Theme did not persist");
  await audit("home dark");
  await page.screenshot({
    path: "reports/home-dark-desktop.png",
    fullPage: true,
  });

  for (const [old, hash] of [
    ["/about", "#about"],
    ["/contact", "#contact"],
    ["/work", "#work"],
  ]) {
    await page.goto(base + old, { waitUntil: "networkidle" });
    if (
      new URL(page.url()).pathname !== "/" ||
      new URL(page.url()).hash !== hash
    )
      throw new Error(`Legacy section URL failed: ${old}`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: "reports/home-mobile.png", fullPage: true });
  if (await overflow()) throw new Error("Mobile overflow on home");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await page.waitForFunction(() => location.hash === "#about");
  if (await page.locator("#mobile-nav").count())
    throw new Error("Mobile menu did not close");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  await audit("home mobile reduced motion");
  await page.goto(base + "/certifications", { waitUntil: "networkidle" });
  if (await overflow()) throw new Error("Certificates mobile overflow");
  await audit("certifications mobile");

  await page.screenshot({
    path: "reports/home-mobile-dark.png",
    fullPage: true,
  });

  await fs.writeFile(
    "reports/browser.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        checks: results.length,
        accessibilityViolations: results.reduce(
          (n, r) => n + r.violations.length,
          0,
        ),
        browserErrors: errors,
      },
      null,
      2,
    ),
  );
  if (errors.length || results.some((r) => r.violations.length))
    process.exitCode = 1;
} finally {
  await browser.close();
}
