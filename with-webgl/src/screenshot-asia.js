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
  await page.setViewport({ width: 412, height: 732 });
  await page.goto("https://m.baidu.com", { waitUntil: "networkidle2" });
  await page.screenshot({ path: "src/baidu_cn.png" });
  await page.goto("https://www.yahoo.co.jp/", { waitUntil: "networkidle2" });
  await page.screenshot({ path: "src/yahoo_jp.png" });
  await page.goto("https://www.naver.com/", { waitUntil: "networkidle2" });
  await page.screenshot({ path: "src/naver_kr.png" });
  await browser.close();
})();
