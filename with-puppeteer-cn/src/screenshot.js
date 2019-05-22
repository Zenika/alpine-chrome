const puppeteer = require('puppeteer');

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

(async() => {
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
    await page.setViewport({width: 412, height: 732})
    await page.goto('http://m.baidu.com', {waitUntil: 'networkidle2'});
    await page.screenshot({path: '/home/chrome/screenshot.png'});
    await browser.close();
})();