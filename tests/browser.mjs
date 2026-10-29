import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3300";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
await fs.mkdir("reports", { recursive: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "dark",
});
const page = await context.newPage();
const errors = [],
  results = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  const routes = [
    "/",
    "/work/selamnew-workspace",
    "/work/knowledge-hub",
    "/work/okde",
    "/work/banglachatpro",
    "/experience",
    "/certifications",
    "/missing-page",
  ];
  for (const route of routes) {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    if (response.status() !== (route === "/missing-page" ? 404 : 200))
      throw new Error(`Wrong status at ${route}`);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    results.push({
      route,
      violations: audit.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    });
  }
  await page.goto(base + "/certifications", { waitUntil: "networkidle" });
  if ((await page.locator(".credential-record").count()) !== 6)
    throw new Error("Six credentials missing");
  await page.getByRole("button", { name: /^DataCamp/ }).click();
  if ((await page.locator(".credential-record").count()) !== 4)
    throw new Error("DataCamp filter failed");
  await page.getByRole("button", { name: /^Microsoft/ }).click();
  if ((await page.locator(".credential-record").count()) !== 2)
    throw new Error("Microsoft filter failed");
  await page.getByRole("button", { name: /^All/ }).click();
  for (const img of await page.locator(".certificate-preview img").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(async (image) => {
      await image.decode();
    });
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: "reports/certifications-dark-desktop.png",
    fullPage: true,
  });
  await page.screenshot({ path: "reports/certifications-hero-desktop.png" });
  await page.goto(base, { waitUntil: "networkidle" });
  for (const id of [
    "work",
    "about",
    "skills",
    "experience",
    "credentials",
    "contact",
  ])
    if ((await page.locator(`#${id}`).count()) !== 1)
      throw new Error(`Missing main-page section: ${id}`);
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
    if (!text.includes(content))
      throw new Error(`Missing restored content: ${content}`);
  await page.evaluate(() => (window.__navigationMarker = "same-document"));
  for (const label of ["About", "Skills", "Experience", "Credentials"]) {
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: label, exact: true })
      .click();
    await page.waitForFunction(
      (id) => location.hash === `#${id}`,
      label.toLowerCase(),
    );
    if (
      (await page.evaluate(() => window.__navigationMarker)) !== "same-document"
    )
      throw new Error("Section link reloaded the document");
  }
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Browse every project" }).click();
  await page.locator("#project-archive[open]").waitFor();
  const archive = page.locator(".archive-expanded");
  if ((await archive.locator(".project-card").count()) !== 17)
    throw new Error("Not all 17 projects restored");
  await archive.getByRole("button", { name: "Mobile", exact: true }).click();
  if ((await archive.locator(".project-card").count()) !== 3)
    throw new Error("Mobile projects missing");
  await archive.getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("button", { name: "Open Ask my portfolio" }).click();
  await page.getByRole("dialog").waitFor();
  await page.locator("#floating-question").waitFor();
  await page.locator("#floating-question").focus();
  await page.keyboard.press("Escape");
  if (
    !(await page
      .getByRole("button", { name: "Open Ask my portfolio" })
      .evaluate((e) => e === document.activeElement))
  )
    throw new Error("Chat focus not restored");
  await page.locator("#contact").scrollIntoViewIfNeeded();
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
    !decodeURIComponent(
      await page
        .getByRole("link", { name: "Send with your email app" })
        .getAttribute("href"),
    ).includes("A draft preserved")
  )
    throw new Error("Email draft fallback lost content");
  if (
    !(await page.locator("#contact-message").inputValue()).includes(
      "A draft preserved",
    )
  )
    throw new Error("Form lost draft");
  await page.unroute("**/api/contact");
  await page.route("**/api/chat", (r) =>
    r.fulfill({
      status: 200,
      contentType: "application/x-ndjson",
      body:
        [
          { type: "text", text: "Knowledge Hub uses Azure AI Search." },
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
  await page
    .getByRole("button", { name: "Tell me about Knowledge Hub" })
    .click();
  await page
    .locator("#ask .source-chips")
    .getByRole("link", { name: "Knowledge Hub" })
    .waitFor();
  await page.unroute("**/api/chat");
  // With provider keys disabled on this preview, this exercises the actual local facts endpoint.
  await page.locator("#portfolio-question").fill("What is your current role?");
  await page
    .locator("#ask")
    .getByRole("button", { name: "Send question" })
    .click();
  await page.locator("#ask .lookup-note").waitFor();
  if (!(await page.locator("#ask").innerText()).includes("Software Engineer"))
    throw new Error("Data-only assistant did not answer");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({
    path: "reports/onepage-dark-desktop.png",
    fullPage: true,
  });
  await page.screenshot({ path: "reports/onepage-hero-desktop.png" });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.reload({ waitUntil: "networkidle" });
  if ((await page.locator("html").getAttribute("data-theme")) !== "light")
    throw new Error("Theme did not persist");
  results.push({
    route: "home light",
    violations: (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  });
  await page.screenshot({
    path: "reports/onepage-light-desktop.png",
    fullPage: true,
  });
  for (const [old, hash] of [
    ["/about", "#about"],
    ["/contact", "#contact"],
    ["/work", "#all-projects"],
  ]) {
    await page.goto(base + old, { waitUntil: "networkidle" });
    if (
      new URL(page.url()).pathname !== "/" ||
      new URL(page.url()).hash !== hash
    )
      throw new Error(`Legacy section URL failed: ${old}`);
  }
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({
    path: "reports/onepage-dark-mobile.png",
    fullPage: true,
  });
  await page.screenshot({ path: "reports/onepage-hero-mobile.png" });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error("Mobile overflow");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await page.waitForFunction(() => location.hash === "#about");
  if (await page.locator("#mobile-nav").count())
    throw new Error("Mobile menu did not close");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  results.push({
    route: "home mobile reduced motion",
    violations: (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  });
  await page.goto(base + "/certifications", { waitUntil: "networkidle" });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error("Credential mobile overflow");
  await page.screenshot({
    path: "reports/certifications-dark-mobile.png",
    fullPage: true,
  });
  results.push({
    route: "certifications mobile",
    violations: (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  });
  await fs.writeFile(
    "reports/browser.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        routesChecked: 11,
        accessibilityViolations: results.reduce(
          (sum, r) => sum + r.violations.length,
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
