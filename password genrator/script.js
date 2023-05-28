let passwordDisplay = document.querySelector("#display");
let copy = document.querySelector("#copy-img");
let count = document.querySelector("#length");
let slider = document.querySelector("#slider");
let uppercase = document.querySelector("#uppercase");
let lowercase = document.querySelector("#lowercase");
let numbers = document.querySelector("#numbers");
let symbols = document.querySelector("#symbols");
let strength = document.querySelector("#str-color");
let button = document.querySelector("#generate-btn");
let allCheckbox = document.querySelectorAll("input[type=checkbox]");
let copiedtxt = document.querySelectorAll(".data-copied");

let checkCount = 0;
let sliderValue = 10;
handleSlider();
function handleSlider() {
  slider.value = sliderValue;
  count.innerHTML = sliderValue;
}

//geting randomness
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomNumber() {
  return getRndInteger(0, 9);
}

function getRandomLower() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function getRandomUpper() {
  return String.fromCharCode(getRndInteger(65, 91));
}

const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function getRandomSymbol() {
  const randmNum = getRndInteger(0, symbol.length);
  return symbol.charAt(randmNum);
}

//copying password
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.innerHTML);
    copiedtxt.innerHTML = "copied";
  } catch (e) {
    copiedtxt.innerHTML = "Failed";
  }

  /*  copiedtxt.classList.add("active");

  setTimeout(() => {
    copiedtxt.classList.remove("active");
  }, 2000); */
}

copy.addEventListener("click", () => {
  if (passwordDisplay.innerHTML) copyContent();
});

//handle checkboxes
function handleCheckbox() {
  checkCount = 0;
  allCheckbox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  //special condition
  if (sliderValue < checkCount) {
    sliderValue = checkCount;
    handleSlider();
  }
}

allCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckbox);
});

slider.addEventListener("input", (e) => {
  sliderValue = e.target.value;
  handleSlider();
});

function setIndicator(color) {
  strength.style.backgroundColor = color;
}

function handleStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercase.checked) hasUpper = true;
  if (lowercase.checked) hasLower = true;
  if (numbers.checked) hasNum = true;
  if (symbols.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && sliderValue >= 8) {
    setIndicator("#0f0");
  } else if ((hasLower || hasUpper) && (hasNum || hasSym) && sliderValue >= 6) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

//generating password

function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

button.addEventListener("click", () => {
  if (checkCount == 0) return;

  if (sliderValue < checkCount) {
    sliderValue = checkCount;
    handleSlider();
  }
  password = "";

  let funArr = [];

  if (uppercase.checked) funArr.push(getRandomUpper);

  if (lowercase.checked) funArr.push(getRandomLower);

  if (numbers.checked) funArr.push(getRandomNumber);

  if (symbols.checked) funArr.push(getRandomSymbol);

  //compulsory addition
  for (let i = 0; i < funArr.length; i++) {
    password += funArr[i]();
  }
  console.log("COmpulsory adddition done");

  // remaining addition
  for (let i = 0; i < sliderValue - funArr.length; i++) {
    let randmIndex = getRndInteger(0, funArr.length);
    console.log("randmIndex" + randmIndex);
    password += funArr[randmIndex]();
  }
  console.log("Remaining adddition done");

  //shuffle the Password
  password = shufflePassword(Array.from(password));
  console.log("Shuffling done");

  //showing in UI
  passwordDisplay.innerText = password;
  console.log("UI adddition done");
  handleStrength();
});
