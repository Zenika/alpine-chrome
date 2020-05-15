const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    bindAddress: "0.0.0.0",
    args: [
      "--headless",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0",
    ],
  });
  const page = await browser.newPage();

  page.on("console", (message) =>
    console.log(
      `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
    )
  );

  const webVitalsScript = await page.evaluate(() =>
    window
      .fetch(
        "https://unpkg.com/web-vitals@0.2.2/dist/web-vitals.es5.umd.min.js"
      )
      .then((res) => res.text())
  );

  await page.evaluateOnNewDocument(webVitalsScript);
  await page.evaluateOnNewDocument(() => {
    window.addEventListener("DOMContentLoaded", () => {
      console.log("DOMContentLoaded!");
      //   webVitals.getCLS(console.log);
      //   webVitals.getFID(console.log);
      //   webVitals.getLCP(console.log);
    });
  });

  await page.goto("https://devfest.gdgnantes.com/", {
    waitUntil: ["networkidle0", "load", "domcontentloaded"],
  });

  //   await page.addScriptTag({
  //     url: "https://unpkg.com/web-vitals@0.2.2/dist/web-vitals.es5.umd.min.js",
  //   }); work on the head section

  await page.evaluate(() => {
    var jq = document.createElement("script");
    jq.setAttribute("type", "text/javascript");
    jq.src =
      "https://unpkg.com/web-vitals@0.2.2/dist/web-vitals.es5.umd.min.js";
    return new Promise((resolve) => {
      jq.addEventListener("load", () => {
        resolve();
      });
      document.getElementsByTagName("body")[0].appendChild(jq);
    });
  });
  const watchWebVitals = page.waitForFunction("window.webVitals !== undefined");
  await watchWebVitals;

  const script =
    "window.webVitals.getCLS(console.log);window.webVitals.getFID(console.log);window.webVitals.getLCP(console.log);console.log('juju');";
  await page.evaluate(script);
  await page.evaluate("console.log('end of script')");

  //Other tests
  await page.click(".btn");
  const title = await page.title();
  console.log(title);
  //const contenthtml = await page.content();
  //console.log(contenthtml);
  await page.close();

  await browser.close();
})();
