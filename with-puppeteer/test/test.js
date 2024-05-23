const events = require("events");
const child_process = require("child_process");

(async () => {
  await events.once(child_process.fork('test/pdf.js'), 'close');
  await events.once(child_process.fork('test/screenshot-asia.js'), 'close');
})();
