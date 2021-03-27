const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

/**
 * Build the web drivers
 */
driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options().headless())
    .build();

module.exports = driver;