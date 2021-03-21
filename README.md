# Stopwatch
A simple web app which runs timers or stopwatches.

## Why I created it?
This page is the result of my frustration with available desktop stopwatch apps. Even though there are other pages with similar capabilities they too have their own flaws, thus I decided to create my own and adjust it to my needs.

## What's the tech?
- HTML: this is a simple page, though I tried to follow semantic rules as much as possible.
- CSS: initial resetting is followed by BEM structure for the displayed components.
- JS: a single script holds DOM references and several functions are used for clock manipulation by subscription to click event of the buttons. A simple polyfill is used for String.padStart for IE browsers.
- Testing: simple linting tasks for HTML, CSS and JS are run with Gulp. E2E tests with Selenium check initial rendering as well as buttons functionality in a start-5_second_wait-stop-reset cycle.
- Deployment: Gulp is used to run checks and transform files for deployment; everything is output into build directory which is not added to repository; actual deployment is performed with GitHub actions.

## Anything to add?
Sure. For now I plan the following extensions:
- make functional in IE;
- add laps to the stopwatch, so a short history can be collected;
- add another view with timer functionality that a user can switch to;
- add a way to control precision;
- add graphics of an old-school analog timer.