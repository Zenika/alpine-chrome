const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
  	executablePath: '/usr/bin/chromium-browser',
  	//args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222'],
  });
  const page = await browser.newPage();
  await page.goto('https://www.chromestatus.com/', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});

  await browser.close();
})();