"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
 * Variables
 */
var display = document.querySelector('.clock__display');
var displayHours = document.querySelector('#clock__display--hours');
var displayMinutes = document.querySelector('#clock__display--minutes');
var displaySeconds = document.querySelector('#clock__display--seconds');
var startButton = document.querySelector('#clock__start-button');
var stopButton = document.querySelector('#clock__stop-button');
var resetButton = document.querySelector('#clock__reset-button');
var prevTime;
var time = 0;
var clock;
/*
 * Main
 */

resetTime();
startButton.addEventListener('click', startWatch);
stopButton.addEventListener('click', stopWatch);
resetButton.addEventListener('click', resetTime);
/*
 * Aux Functions
 */

function resetTime() {
  stopWatch();
  clock = null;
  displayHours.textContent = '00';
  displayMinutes.textContent = '00';
  displaySeconds.textContent = '00';
}

function startWatch() {
  if (!clock) time = 0;
  prevTime = new Date();
  clock = setInterval(updateTime, 1000);
  display.setAttribute('data-state', 'active');
  startButton.removeEventListener('click', startWatch);
}

function stopWatch() {
  clearInterval(clock);
  display.setAttribute('data-state', 'inactive');
  startButton.addEventListener('click', startWatch);
}

function updateTime() {
  var currentTime = Date.now();
  time += currentTime - prevTime;
  prevTime = currentTime;

  var _parseTime = parseTime(time / 1000),
      _parseTime2 = _slicedToArray(_parseTime, 3),
      hours = _parseTime2[0],
      minutes = _parseTime2[1],
      seconds = _parseTime2[2];

  displayTime(hours, minutes, seconds);
}

function displayTime(hours, minutes, seconds) {
  displayHours.textContent = hours.toString().padStart(2, '0');
  displayMinutes.textContent = minutes.toString().padStart(2, '0');
  displaySeconds.textContent = seconds.toString().padStart(2, '0');
}

function parseTime(secondsTotal) {
  var hours = Math.floor(secondsTotal / 60 / 60);
  var minutes = Math.floor((secondsTotal - hours * 60 * 60) / 60);
  var seconds = (secondsTotal % 60).toFixed(0);
  return [hours, minutes, seconds];
}