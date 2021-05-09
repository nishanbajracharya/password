// build/_snowpack/pkg/password-generator.js
function getCharacterCount(string = "", source = "") {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    const character = string[i];
    if (source.includes(character))
      count++;
  }
  return count;
}
function shuffle(string = "") {
  return string.split("").sort(function() {
    return 0.5 - Math.random();
  }).join("");
}
var util = {
  shuffle,
  getCharacterCount
};
var {shuffle: shuffle$1} = util;
var numbers = "0123456789";
var lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
var upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var symbols = `_%$@!-`;
var DEFAULT_OPTIONS = {
  numbers: false,
  lowerCase: true,
  upperCase: true,
  symbols: false,
  length: 8
};
function generate(options = {}) {
  const completeOptions = {...DEFAULT_OPTIONS, ...options};
  let requiredLength = completeOptions.length < 1 ? DEFAULT_OPTIONS.length : completeOptions.length;
  let allCharacters = "";
  if (completeOptions.numbers)
    allCharacters += numbers;
  if (completeOptions.lowerCase)
    allCharacters += lowerCaseLetters;
  if (completeOptions.upperCase)
    allCharacters += upperCaseLetters;
  if (completeOptions.symbols)
    allCharacters += symbols;
  if (!allCharacters)
    allCharacters = lowerCaseLetters;
  const shuffledSet = shuffle$1(allCharacters);
  let password2 = shuffledSet.slice(0, requiredLength);
  const remainingCharacters = requiredLength - password2.length;
  if (remainingCharacters > 0) {
    for (let i = 0; i < remainingCharacters; i++) {
      allCharacters = shuffle$1(allCharacters);
      password2 += allCharacters[0];
    }
  }
  return shuffle$1(password2);
}
var passwordGenerator = generate;
var password_generator_default = passwordGenerator;

// build/src/snackbar.js
var isActive = false;
var barElement = document.createElement("div");
barElement.classList.add("snackbar");
document.body.appendChild(barElement);
var timeout;
var DEFAULT_OPTIONS2 = {
  duration: 2500,
  className: "show"
};
function show(message = "", options = {}) {
  const snackbarOptions = {
    ...DEFAULT_OPTIONS2,
    ...options
  };
  if (!isActive) {
    isActive = true;
    barElement.classList.add(snackbarOptions.className);
    barElement.textContent = message;
    timeout = window.setTimeout(hide.bind({}, options), snackbarOptions.duration);
  }
}
function hide(options = {}) {
  const snackbarOptions = {
    ...DEFAULT_OPTIONS2,
    ...options
  };
  isActive = false;
  clearTimeout(timeout);
  barElement.classList.remove(snackbarOptions.className);
}

// build/src/index.js
var RANGE_DEFAULT = 12;
var RANGE_MIN = 2;
var RANGE_MAX = 32;
var THEMES = {
  DARK: "dark",
  LIGHT: "light"
};
var DEFAULT_THEME = THEMES.DARK;
var resultContainer = document.getElementById("result-container");
var themeButton = document.getElementById("theme-button");
var copyButton = document.getElementById("copy-button");
var optionRange = document.getElementById("option-length-range");
var optionLength = document.getElementById("option-length");
var form = document.getElementById("password-form");
var result = document.getElementById("result");
var password = "";
function setInputRange(input) {
  input.setAttribute("min", RANGE_MIN);
  input.setAttribute("max", RANGE_MAX);
  input.setAttribute("value", RANGE_DEFAULT);
}
setInputRange(optionRange);
setInputRange(optionLength);
optionRange.addEventListener("input", (e) => {
  optionLength.value = e.target.value;
  resultContainer.classList.contains("show") && submitForm(form);
});
optionLength.addEventListener("input", (e) => {
  let value = Number(e.target.value);
  if (value > RANGE_MAX)
    value = RANGE_MAX;
  if (value < RANGE_MIN)
    value = RANGE_MIN;
  optionRange.value = String(value);
  setTimeout(() => {
    optionLength.value = String(value);
    resultContainer.classList.contains("show") && submitForm(form);
  }, 250);
});
form.addEventListener("submit", function(e) {
  e.preventDefault();
  submitForm(form);
});
function submitForm(form2) {
  const formData = new FormData(form2);
  const numbers2 = formData.get("option-numbers") === "on";
  const lowerCase = formData.get("option-lowercase") === "on";
  const upperCase = formData.get("option-uppercase") === "on";
  const symbols2 = formData.get("option-symbols") === "on";
  const length = Number(formData.get("option-length"));
  const options = {
    numbers: numbers2,
    lowerCase,
    upperCase,
    symbols: symbols2,
    length
  };
  password = password_generator_default(options);
  result.textContent = password;
  resultContainer.classList.add("show");
}
copyButton.addEventListener("click", function() {
  password && copyText(password);
});
function copyText(text = "") {
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  show("Password copied");
}
themeButton.addEventListener("click", function() {
  const currentTheme = document.body.getAttribute("data-theme") || DEFAULT_THEME;
  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  document.body.setAttribute("data-theme", newTheme);
});
//# sourceMappingURL=index.js.map
