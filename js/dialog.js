'use strict';
(function () {
  var setupWindow = document.querySelector('.setup');
  var buttonSetupOpen = document.querySelector('.setup-open');
  var setupCharacter = setupWindow.querySelector('.setup-player');
  var fireball = setupCharacter.querySelector('.setup-fireball-wrap');
  var wizardEyes = setupCharacter.querySelector('.wizard-eyes');
  var wizardCoat = setupCharacter.querySelector('.setup-wizard .wizard-coat');

  var popupOpen = function () {
    var setupName = setupWindow.querySelector('.setup-user-name');
    var buttonSetupClose = setupWindow.querySelector('.setup-close');
    setupWindow.classList.remove('hidden');
    fireball.addEventListener('click', onFireballClick);
    wizardEyes.addEventListener('click', onEyesClick);
    wizardCoat.addEventListener('click', onCoatClick);
    buttonSetupClose.addEventListener('click', onSetupClickClose);
    buttonSetupClose.addEventListener('keydown', onSetupEnterPressClose);
    document.addEventListener('keydown', onSetupEscPress);
    setupName.addEventListener('focus', function () {
      document.removeEventListener('keydown', onSetupEscPress);
    });
    setupName.addEventListener('blur', function () {
      document.addEventListener('keydown', onSetupEscPress);
    });
  };

  var popupClose = function () {
    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
  };

  var onSetupClickOpen = function () {
    popupOpen();
  };

  var onSetupClickClose = function () {
    popupClose();
  };

  var onSetupEnterPressOpen = function (evt) {
    window.util.isEnterEvent(evt, popupOpen);
  };

  var onSetupEnterPressClose = function (evt) {
    window.util.isEnterEvent(evt, popupClose);
  };

  var onSetupEscPress = function (evt) {
    window.util.isEscEvent(evt, popupClose);
  };

  var onFireballClick = function (evt) {
    var target = evt.currentTarget;
    var fireballInput = fireball.querySelector('input[name="fireball-color"]');
    var fireballColor = window.util.getRandom(window.const.FIREBALL_COLORS);
    target.style.background = fireballColor;
    fireballInput.value = fireballColor;
  };

  var onEyesClick = function (evt) {
    var target = evt.target;
    var eyesInput = setupCharacter.querySelector('input[name="eyes-color"]');
    var eyesColor = window.util.getRandom(window.const.EYE_COLORS);
    target.style.fill = eyesColor;
    eyesInput.value = eyesColor;
  };

  var onCoatClick = function (evt) {
    var target = evt.target;
    var coatInput = setupCharacter.querySelector('input[name="coat-color"]');
    var coatColor = window.util.getRandom(window.const.COAT_COLORS);
    target.style.fill = coatColor;
    coatInput.value = coatColor;
  };

  buttonSetupOpen.addEventListener('click', onSetupClickOpen);
  buttonSetupOpen.addEventListener('keydown', onSetupEnterPressOpen);
})();
