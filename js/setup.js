'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var ENTER = 'Enter';
var ESC = 'Escape';
var setupWindow = document.querySelector('.setup');
var buttonSetupOpen = document.querySelector('.setup-open');
var setupCharacter = setupWindow.querySelector('.setup-player');


var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateData = function (count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data[i] = {
      name: getRandom(WIZARD_NAMES) + ' ' + getRandom(WIZARD_SURNAMES),
      coatColor: getRandom(COAT_COLORS),
      eyesColor: getRandom(EYE_COLORS)
    };
  }
  return data;
};

var renderWizards = function (obj) {
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var templateElement = template.cloneNode(true);
  templateElement.querySelector('.setup-similar-label').textContent = obj.name;
  templateElement.querySelector('.wizard-coat').style.fill = obj.coatColor;
  templateElement.querySelector('.wizard-eyes').style.fill = obj.eyesColor;
  return templateElement;
};

var buildFragment = function (array) {
  var fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    fragment.appendChild(renderWizards(item));
  });
  return fragment;
};

var showWizards = function () {
  var similarWizards = setupWindow.querySelector('.setup-similar-list');
  var similarWizardsBlock = setupWindow.querySelector('.setup-similar');
  similarWizards.textContent = '';
  similarWizards.appendChild(buildFragment(generateData(WIZARDS_COUNT)));
  similarWizardsBlock.classList.remove('hidden');
};

showWizards();

var popupOpen = function () {
  var setupName = setupWindow.querySelector('.setup-user-name');
  var buttonSetupClose = setupWindow.querySelector('.setup-close');
  setupWindow.classList.remove('hidden');
  buttonSetupClose.addEventListener('click', onClickClose);
  buttonSetupClose.addEventListener('keydown', onEnterClose);
  document.addEventListener('keydown', onEscClose);
  setupName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscClose);
  });
  setupName.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscClose);
  });
};

var popupClose = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onEscClose);
};

var onClickOpen = function () {
  popupOpen();
};

var onClickClose = function () {
  popupClose();
};

var onEnterOpen = function (evt) {
  if (evt.key === ENTER) {
    popupOpen();
  }
};

var onEnterClose = function (evt) {
  if (evt.key === ENTER) {
    popupClose();
  }
};

var onEscClose = function (evt) {
  if (evt.key === ESC) {
    popupClose();
  }
};

var onClickChangeColor = function (evt) {
  var target = evt.target;
  if (target.classList.contains('setup-fireball')) {
    var fireball = setupCharacter.querySelector('.setup-fireball-wrap');
    var fireballInput = fireball.querySelector('input[name="fireball-color"]');
    var fireballColor = getRandom(FIREBALL_COLORS);
    fireball.style.background = fireballColor;
    fireballInput.value = fireballColor;
  }
  if (target.classList.contains('wizard-eyes')) {
    var eyes = setupCharacter.querySelector('.wizard-eyes');
    var eyesInput = setupCharacter.querySelector('input[name="eyes-color"]');
    var eyesColor = getRandom(EYE_COLORS);
    eyes.style.fill = eyesColor;
    eyesInput.value = eyesColor;
  }
  if (target.classList.contains('wizard-coat')) {
    var coat = setupCharacter.querySelector('.setup-wizard .wizard-coat');
    var coatInput = setupCharacter.querySelector('input[name="coat-color"]');
    var coatColor = getRandom(COAT_COLORS);
    coat.style.fill = coatColor;
    coatInput.value = coatColor;
  }
};

buttonSetupOpen.addEventListener('click', onClickOpen);
buttonSetupOpen.addEventListener('keydown', onEnterOpen);
setupCharacter.addEventListener('click', onClickChangeColor);
