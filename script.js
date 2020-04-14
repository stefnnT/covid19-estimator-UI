const welcomeMessage = document.querySelector('.welcome-message');
const launchButton = document.querySelector('.launch-button');
const formSection = document.querySelector('.forms-wrapper');
const formButton = document.querySelector('.form-button');

const launch = _ => {
  formSection.classList.remove('hide');
  formButton.classList.remove('hide');
  welcomeMessage.classList.add('hide');
  launchButton.classList.add('hide');
}

launchButton.addEventListener('click', launch); 