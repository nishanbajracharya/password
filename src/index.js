import generatePassword from 'password-generator';

const RANGE_DEFAULT = 12;
const RANGE_MIN = 2;
const RANGE_MAX = 32;

const optionRange = document.getElementById('option-length-range');
const optionLength = document.getElementById('option-length');

function setInputRange(input) {
  input.setAttribute('min', RANGE_MIN);
  input.setAttribute('max', RANGE_MAX);
  input.setAttribute('value', RANGE_DEFAULT);
}

setInputRange(optionRange);
setInputRange(optionLength);

optionRange.addEventListener('input', (e) => {
  optionLength.value = e.target.value;
});

optionLength.addEventListener('input', (e) => {
  let value = Number(e.target.value);

  if (value > RANGE_MAX) value = RANGE_MAX;
  if (value < RANGE_MIN) value = RANGE_MIN;

  optionRange.value = String(value);

  setTimeout(() => {
    optionLength.value = String(value);
  }, 250);
});

const form = document.getElementById('password-form');

const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

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

  result.textContent = generatePassword(options);
});
