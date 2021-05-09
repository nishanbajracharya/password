import generatePassword from 'password-generator';

import * as snackbar from './snackbar';

const RANGE_DEFAULT = 12;
const RANGE_MIN = 2;
const RANGE_MAX = 32;

const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

const DEFAULT_THEME = THEMES.DARK;

const resultContainer = document.getElementById('result-container');
const themeButton = document.getElementById('theme-button');
const copyButton = document.getElementById('copy-button');

const optionRange = document.getElementById('option-length-range');
const optionLength = document.getElementById('option-length');

const form = document.getElementById('password-form');

const result = document.getElementById('result');

let password = '';

function setInputRange(input) {
  input.setAttribute('min', RANGE_MIN);
  input.setAttribute('max', RANGE_MAX);
  input.setAttribute('value', RANGE_DEFAULT);
}

setInputRange(optionRange);
setInputRange(optionLength);

optionRange.addEventListener('input', (e) => {
  optionLength.value = e.target.value;

  resultContainer.classList.contains('show') && submitForm(form);
});

optionLength.addEventListener('input', (e) => {
  let value = Number(e.target.value);

  if (value > RANGE_MAX) value = RANGE_MAX;
  if (value < RANGE_MIN) value = RANGE_MIN;

  optionRange.value = String(value);

  setTimeout(() => {
    optionLength.value = String(value);

    resultContainer.classList.contains('show') && submitForm(form);
  }, 250);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  submitForm(form);
});

function submitForm(form) {
  const formData = new FormData(form);

  const numbers = formData.get('option-numbers') === 'on';
  const lowerCase = formData.get('option-lowercase') === 'on';
  const upperCase = formData.get('option-uppercase') === 'on';
  const symbols = formData.get('option-symbols') === 'on';
  const length = Number(formData.get('option-length'));

  const options = {
    numbers,
    lowerCase,
    upperCase,
    symbols,
    length,
  };

  password = generatePassword(options);
  result.textContent = password;
  resultContainer.classList.add('show');
}

copyButton.addEventListener('click', function () {
  password && copyText(password);
});

function copyText(text = '') {
  const input = document.createElement('input');
  document.body.appendChild(input);

  input.value = text;

  input.select();

  document.execCommand('copy');

  document.body.removeChild(input);

  snackbar.show('Password copied');
}

themeButton.addEventListener('click', function () {
  const currentTheme =
    document.body.getAttribute('data-theme') || DEFAULT_THEME;

  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

  document.body.setAttribute('data-theme', newTheme);
});
