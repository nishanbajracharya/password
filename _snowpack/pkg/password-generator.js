function getCharacterCount(string = '', source = '') {
  let count = 0;

  for (let i = 0; i < string.length; i++) {
    const character = string[i];

    if (source.includes(character)) count++;
  }

  return count;
}

function shuffle(string = '') {
  return string
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');
}

var util = {
  shuffle,
  getCharacterCount,
};

const { shuffle: shuffle$1 } = util;

const numbers = '0123456789';
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = `_%$@!-`;
// const allSymbols = `~!@#$%^&*()_+-={}[]\|;:'"<>?,./\``;

const DEFAULT_OPTIONS = {
  numbers: false,
  lowerCase: true,
  upperCase: true,
  symbols: false,
  length: 8,
};

function generate(options = {}) {
  const completeOptions = { ...DEFAULT_OPTIONS, ...options };

  let requiredLength =
    completeOptions.length < 1
      ? DEFAULT_OPTIONS.length
      : completeOptions.length;

  let allCharacters = '';

  if (completeOptions.numbers) allCharacters += numbers;
  if (completeOptions.lowerCase) allCharacters += lowerCaseLetters;
  if (completeOptions.upperCase) allCharacters += upperCaseLetters;
  if (completeOptions.symbols) allCharacters += symbols;

  if (!allCharacters) allCharacters = lowerCaseLetters;

  const shuffledSet = shuffle$1(allCharacters);

  let password = shuffledSet.slice(0, requiredLength);

  const remainingCharacters = requiredLength - password.length;

  if (remainingCharacters > 0) {
    for (let i = 0; i < remainingCharacters; i++) {
      allCharacters = shuffle$1(allCharacters);

      password += allCharacters[0];
    }
  }

  return shuffle$1(password);
}

var passwordGenerator = generate;

export default passwordGenerator;
