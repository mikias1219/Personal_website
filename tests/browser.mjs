import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
await fs.mkdir("reports", { recursive: true });
const errors = [],
  results = [];
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "dark",
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
const routes = [
  "/",
  "/work",
  "/work/selamnew-workspace",
  "/work/knowledge-hub",
  "/work/okde",
  "/work/banglachatpro",
  "/about",
  "/experience",
  "/contact",
  "/missing-page",
];
for (const route of routes) {
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  if (response.status() !== (route === "/missing-page" ? 404 : 200))
    throw new Error(`Wrong status at ${route}: ${response.status()}`);
  await page.locator("h1").waitFor();
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  results.push({
    route,
    status: response.status(),
    violations: audit.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => n.target),
    })),
  });
  if (route === "/") {
    await page.screenshot({
      path: "reports/home-dark-desktop.png",
      fullPage: true,
    });
    await page.screenshot({ path: "reports/hero-dark-desktop.png" });
  }
  if (route === "/work") {
    await page.getByRole("button", { name: "Mobile", exact: true }).click();
    if ((await page.locator(".project-card").count()) !== 1)
      throw new Error("Mobile filter failed");
    await page.getByRole("button", { name: "All", exact: true }).click();
    if ((await page.locator(".project-card").count()) !== 8)
      throw new Error("All filter failed");
  }
  if (route === "/experience") {
    const text = await page.locator("main").innerText();
    if (
      !text.includes("Jun 2020 – Jul 2024") ||
      !text.includes("AI GTP") ||
      text.includes("Private Company")
    )
      throw new Error("Experience facts mismatch");
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: "reports/experience-print.pdf",
      format: "A4",
      printBackground: true,
    });
    await page.emulateMedia({ media: "screen" });
  }
  if (route === "/contact") {
    await page.getByRole("button", { name: "Send message" }).click();
    await page.locator("#name-error").waitFor();
    await page.locator("#contact-name").fill("Example Recruiter");
    await page.locator("#contact-email").fill("test@example.com");
    await page
      .locator("#contact-message")
      .fill("A test enquiry that must never be delivered.");
    await page.route("**/api/contact", (r) =>
      r.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Test service unavailable." }),
      }),
    );
    await page.getByRole("button", { name: "Send message" }).click();
    await page.getByText("Test service unavailable.").waitFor();
    if (
      (await page.locator("#contact-message").inputValue()) !==
      "A test enquiry that must never be delivered."
    )
      throw new Error("Contact lost draft");
    await page.unroute("**/api/contact");
    await page.getByRole("button", { name: "Open Ask my portfolio" }).click();
    await page.getByRole("dialog").waitFor();
    await page.locator("#floating-question").waitFor();
    await page.locator("#floating-question").focus();
    await page.keyboard.press("Escape");
    if (await page.getByRole("dialog").count())
      throw new Error("Dialog did not close");
    if (
      !(await page
        .getByRole("button", { name: "Open Ask my portfolio" })
        .evaluate((e) => e === document.activeElement))
    )
      throw new Error("Focus not restored");
  }
}
await page.goto(base);
await page.getByRole("button", { name: "Switch to light theme" }).click();
await page.reload({ waitUntil: "networkidle" });
if ((await page.locator("html").getAttribute("data-theme")) !== "light")
  throw new Error("Theme not persistent");
await page.screenshot({
  path: "reports/home-light-desktop.png",
  fullPage: true,
});
results.push({
  route: "home light",
  violations: (
    await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze()
  ).violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
});
await page.route("**/api/chat", (r) =>
  r.fulfill({
    status: 200,
    contentType: "application/x-ndjson",
    body:
      [
        {
          type: "text",
          text: "Knowledge Hub uses Azure AI Search and Azure OpenAI.",
        },
        {
          type: "sources",
          sources: [{ label: "Knowledge Hub", href: "/work/knowledge-hub" }],
        },
        { type: "done" },
      ]
        .map((e) => JSON.stringify(e))
        .join("\n") + "\n",
  }),
);
await page.getByRole("button", { name: "Tell me about Knowledge Hub" }).click();
await page
  .locator(".source-chips")
  .getByRole("link", { name: "Knowledge Hub" })
  .waitFor();
await page.getByRole("button", { name: "Switch to dark theme" }).click();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base, { waitUntil: "networkidle" });
await page.screenshot({ path: "reports/home-dark-mobile.png", fullPage: true });
await page.screenshot({ path: "reports/hero-dark-mobile.png" });
for (const route of routes.slice(0, -1)) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error(`Horizontal overflow at ${route}`);
}
await page.getByRole("button", { name: "Open navigation" }).click();
await page
  .getByRole("navigation", { name: "Mobile" })
  .getByRole("link", { name: "Work" })
  .click();
await page.waitForURL(base + "/work");
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(base, { waitUntil: "networkidle" });
results.push({
  route: "home mobile reduced motion",
  violations: (
    await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze()
  ).violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
});
await fs.writeFile(
  "reports/browser.json",
  JSON.stringify({ results, errors }, null, 2),
);
await browser.close();
console.log(
  JSON.stringify(
    {
      routesChecked: routes.length,
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
