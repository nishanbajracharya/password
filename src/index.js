import generatePassword from 'password-generator';

const optionRange = document.getElementById('option-length-range');
const optionLength = document.getElementById('option-length');

optionRange.addEventListener('change', (e) => {
  optionLength.value = e.target.value;
});

optionLength.addEventListener('change', (e) => {
  optionRange.value = e.target.value;
});

const form = document.getElementById('password-form');

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

  console.log(generatePassword(options));
});
