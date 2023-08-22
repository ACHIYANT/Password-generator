const inputSlider = document.querySelector("[lengthSlider]");
const lengthNumber = document.querySelector(".length-no");
const passwordDisplay = document.querySelector("[passwordDisply]");
const copyBtn = document.querySelector(".copy-btn");
const copyText = document.querySelector(".copied-text");
const upperCase = document.querySelector("#upperCase");
const lowerCase = document.querySelector("#lowerCase");
const number = document.querySelector("#number");
const symbols = document.querySelector("#symbols");
const strengthIndicator = document.querySelector("[strengthIndicator]");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBoxes = document.querySelectorAll("input[type=checkbox");

let password = "";
let passwordLength = 10;
lengthNumber.value = inputSlider.value;
let checkCount = 1;

handleSlider();
const symbolString = "`~!@#$%^&*()_+{}|:<>?-;'.,\\/";

function setPwdLength() {
  passwordLength < 10
    ? (lengthNumber.value = "0" + inputSlider.value)
    : (lengthNumber.value = inputSlider.value);
}

function handleSlider() {
  inputSlider.value = passwordLength;
  setPwdLength();
}

function handleCheckBoxCount() {
  checkCount = 0;
  allCheckBoxes.forEach((checkbox) => {
    checkbox.checked ? checkCount++ : checkCount;
  });
}
allCheckBoxes.forEach((checkBox) =>
  checkBox.addEventListener("click", handleCheckBoxCount)
);
function randomInteger(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}
function randomNumber() {
  return randomInteger(0, 10);
}
function randomLowerCase() {
  return String.fromCharCode(randomInteger(97, 123));
}
function randomUpperCase() {
  return String.fromCharCode(randomInteger(65, 91));
}
function randomSymbol() {
  return symbolString[randomInteger(0, symbolString.length)];
}
