import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import fs from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const routes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      "/",
      "/work",
      "/work/selamnew-workspace",
      "/work/knowledge-hub",
      "/work/okde",
      "/work/banglachatpro",
      "/about",
      "/experience",
      "/contact",
    ];
await fs.mkdir("reports", { recursive: true });
const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
});
const summary = JSON.parse(
  await fs
    .readFile("reports/lighthouse-summary.json", "utf8")
    .catch(() => "[]"),
);
try {
  for (const route of routes) {
    const result = await lighthouse(base + route, {
      port: chrome.port,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    if (!result) throw new Error("No Lighthouse result");
    const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    await fs.writeFile(`reports/lighthouse-${slug}.json`, result.report[0]);
    await fs.writeFile(`reports/lighthouse-${slug}.html`, result.report[1]);
    const row = {
      route,
      ...Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      LCP: result.lhr.audits["largest-contentful-paint"].numericValue,
      CLS: result.lhr.audits["cumulative-layout-shift"].numericValue,
    };
    const previous = summary.findIndex((item) => item.route === route);
    if (previous < 0) summary.push(row);
    else summary[previous] = row;
    console.log(JSON.stringify(row));
  }
  await fs.writeFile(
    "reports/lighthouse-summary.json",
    JSON.stringify(summary, null, 2),
  );
} finally {
  await chrome.kill();
}
