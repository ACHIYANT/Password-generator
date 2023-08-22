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

function indicator(color) {
  strengthIndicator.style.backgroundColor = color;
  strengthIndicator.style.boxShadow = `0 0 15px ${color}`;
}

function strength() {
  let hasUpper = upperCase.checked ? true : false;
  let hasLower = lowerCase.checked ? true : false;
  let hasNumber = number.checked ? true : false;
  let hasSymbol = symbols.checked ? true : false;
  console.log(hasUpper, hasLower, hasNumber, hasSymbol);

  if (
    hasUpper &&
    hasLower &&
    (hasNumber || hasSymbol) &&
    password.length >= 8
  ) {
    indicator("green");
  } else if (
    (hasUpper || hasLower) &&
    (hasNumber || hasSymbol) &&
    password.length >= 6
  ) {
    indicator("yellow");
  } else {
    indicator("red");
  }
}

function passwordShuffle(passwordArr) {
  for (let i = passwordArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    console.log(rand);
    const temp = passwordArr[i];
    passwordArr[i] = passwordArr[rand];
    passwordArr[rand] = temp;
  }
  console.log(passwordArr);
  let str = "";
  passwordArr.forEach((ele) => (str += ele));
  return str;
}

function copyMsgVisible(message) {
  copyText.innerText = message;
  copyText.classList.add("visible");
  setTimeout(() => copyText.classList.remove("visible"), 2000);
}
async function copyClipBoard() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsgVisible("Copied");
  } catch (e) {
    copyMsgVisible("Failed");
  }
}

copyBtn.addEventListener("click", () => {
  passwordDisplay.value ? copyClipBoard() : copyMsgVisible("Nothing to copy");
});

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

generateBtn.addEventListener("click", () => {
  if (checkCount == 0) return;
  password = "";

  let funcArr = [];
  if (upperCase.checked) {
    funcArr.push(randomUpperCase);
  }
  if (lowerCase.checked) {
    funcArr.push(randomLowerCase);
  }
  if (number.checked) {
    funcArr.push(randomNumber);
  }
  if (symbols.checked) {
    funcArr.push(randomSymbol);
  }
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  for (let i = checkCount; i < passwordLength; i++) {
    let randomInd = randomInteger(0, funcArr.length);
    password += funcArr[randomInd]();
  }
  password = passwordShuffle(Array.from(password));
  passwordDisplay.value = password;
  strength();
});
