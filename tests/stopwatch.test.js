const assert = require('assert');
const chalk = require('chalk');

const By = require('selenium-webdriver').By;

/**
 * Custom logging
 */
const PADDING = '    ';

const logWithTab = text => console.log(PADDING, text);
const logInGreen = text => console.log(chalk.green(text));
const logInRed = text => console.log(chalk.red(text));
const logInGreenBack = text => console.log(chalk.whiteBright.bgGreen(text));

/**
 * Run the tests
 */

module.exports = stopwatchTestIn;

/**
 * The test body
 * @param {string} browser - string defining which browser to run
 */
async function stopwatchTestIn(driver) {
    
    logInGreenBack('Running tests in browser');
    await driver.get('http://localhost:8080');

    const startButton = driver.findElement(By.id('clock__start-button'));
    const stopButton = driver.findElement(By.id('clock__stop-button'));
    const resetpButton = driver.findElement(By.id('clock__reset-button'));
    const hoursDisplay = driver.findElement(By.id('clock__display--hours'));
    const minutesDisplay = driver.findElement(By.id('clock__display--minutes'));
    const secondsDisplay = driver.findElement(By.id('clock__display--seconds'));

    // Initial state
    logInGreen('On start:')
    let hoursDisplayText = await secondsDisplay.getText();
    let minutesDisplayText = await secondsDisplay.getText();
    let secondsDisplayText = await secondsDisplay.getText();
    logWithTab(`Display shows ${hoursDisplayText} hours, ${minutesDisplayText} hours and ${secondsDisplayText} hours`);

    assert.strictEqual(hoursDisplayText, '00');
    assert.strictEqual(secondsDisplayText, '00');
    assert.strictEqual(secondsDisplayText, '00');

    const startButtonText = await startButton.getText();
    assert.strictEqual(startButtonText, '▶︎');
    logWithTab(`Start Button text is ${startButtonText}`);

    const stopButtonText = await stopButton.getText();
    assert.strictEqual(stopButtonText, '◼︎');
    logWithTab(`Start Button text is ${stopButtonText}`);

    const resetpButtonText = await resetpButton.getText();
    assert.strictEqual(resetpButtonText, 'pReset');
    logWithTab(`Start Button text is ${resetpButtonText}`);

    // 5 Seconds wait
    const timeout = 5;
    await startButton.click();
    await driver.sleep(timeout * 1000);
    await stopButton.click();
    secondsDisplayText = await secondsDisplay.getText();
    logInGreen(`On start, ${timeout} seconds wait and stop:`)
    logWithTab(`Seconds display shows ${secondsDisplayText} seconds`);
    assert.strictEqual(secondsDisplayText, '05');

    // Reset
    await resetpButton.click();
    secondsDisplayText = await secondsDisplay.getText();
    logInGreen('On reset:')
    logWithTab(`Seconds display shows ${secondsDisplayText} seconds`);
    assert.strictEqual(secondsDisplayText, '00');
}