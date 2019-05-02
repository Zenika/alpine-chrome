const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    bindAddress: "0.0.0.0",
    args: [
      "--headless",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0"
    ]
  });
  const page = await browser.newPage();
  await page.goto("https://devfest.gdgnantes.com/", {
    waitUntil: "networkidle2"
  });
  await page.pdf({
    path: "src/devfest.pdf",
    printBackground: true,
    format: "A4"
  });

  await browser.close();
})();
