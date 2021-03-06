let isActive = false;

let barElement = document.createElement('div');
barElement.classList.add('snackbar');

document.body.appendChild(barElement);

let timeout;

const DEFAULT_OPTIONS = {
  duration: 2500,
  className: 'show',
};

function show(message = '', options = {}) {
  const snackbarOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  if (!isActive) {
    isActive = true;
    barElement.classList.add(snackbarOptions.className);
    barElement.textContent = message;

    timeout = window.setTimeout(
      hide.bind({}, options),
      snackbarOptions.duration
    );
  }
}

function hide(options = {}) {
  const snackbarOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  isActive = false;
  clearTimeout(timeout);
  barElement.classList.remove(snackbarOptions.className);
}

export { show, hide };
