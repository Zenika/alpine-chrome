const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  let extensionPath = path.join(__dirname, "chrome-extension");
  
  const browser = await puppeteer.launch({
    bindAddress: "0.0.0.0",
    headless: false,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: [
      `--load-extension=${extensionPath}`,
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0"
    ]
  });
  const page = await browser.newPage();
  await page.goto("http://icanhazip.com/", {
    waitUntil: "networkidle2"
  });
  await page.screenshot({ path: "src/screenshot.png" });
  await browser.close();
})();
