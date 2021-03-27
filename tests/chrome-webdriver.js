const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

/**
 * Build the web drivers
 */
driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();

module.exports = driver;