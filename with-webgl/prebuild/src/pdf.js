const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    bindAddress: "0.0.0.0",
    executablePath: '/usr/bin/chromium-browser',
    args: [
      "--headless",
      "--no-sandbox",
      "--hide-scrollbars",
      "--disable-dev-shm-usage",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0"
    ]
  });
  const page = await browser.newPage();
  await page.goto("https://browserleaks.com/webgl", {
    waitUntil: "networkidle2"
  });
  await page.pdf({
    path: "devtest.pdf",
    printBackground: true,
    format: "A4"
  });

  await browser.close();
})();
