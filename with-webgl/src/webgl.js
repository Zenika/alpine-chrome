const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    bindAddress: "0.0.0.0",
    args: [
      "--no-sandbox",
      "--headless",
      //"--enable-webgl",
      //"--ignore-gpu-blacklist",
      //
      "--use-gl=swiftshader",
      "--disable-dev-shm-usage",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0"
    ]
  });
  const page = await browser.newPage();
  await page.goto(
    "https://webglfundamentals.org/webgl/webgl-fundamentals.html",
    { waitUntil: "networkidle2" }
  );
  await page.screenshot({ path: "src/webgl-fundamentals.png" });

  await page.goto("https://browserleaks.com/webgl", {
    waitUntil: "networkidle2"
  });
  await page.screenshot({ path: "src/webgl-activated.png" });
  await browser.close();
})();
