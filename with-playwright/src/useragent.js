const { chromium } = require("playwright-chromium");

(async () => {
  const { exec } = require("child_process");
  exec(
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH + " --version",
    function callback(error, stdout, stderr) {
      console.log(stdout);
    }
  );
})();
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    // 💡 This enables logs for the communication between Playwright and Chromium
    // logger: {
    //   isEnabled: (name, severity) => name === "browser" || "context",
    //   log: (name, severity, message, args) => console.log(`${name} ${message}`),
    // },
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://whatsmyuseragent.org/");
  await page.screenshot({ path: `src/example-chromium.png` });
  await browser.close();
})();
