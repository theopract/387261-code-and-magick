/* eslint strict: ["error", "global"]*/

'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// Массив возможных имён магов
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
// Массив возможных фамилий магов
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
// Массив возможного цвета мантии мага
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
// Массив возможного цвета глаз мага
var YEYS_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * Случайным образом и в случайном порядке складываем Имя и Фамилию мага
 * @param {*} name Массив возможных имён мага
 * @param {*} surname Массив возможных фамилий магов
 * @return {string}
 */
var generateFullName = function (name, surname) {
  var randName = name[Math.round(Math.random() * (name.length - 1))];           // выбираем случайно имя из массива name
  var randSurname = surname[Math.round(Math.random() * (surname.length - 1))];  // выбираем случайную фамилию из массива surname
  // возвращаем случайным образом или "Имя + Фамилию" или "Фамилию + Имя"
  return (Math.random() >= 0.5) ? randName + ' ' + randSurname : randSurname + ' ' + randName;
};

/**
 * Функция для случайного выбора элемента из массива
 * @param {*} elems
 * @return {string}
 */
var randField = function (elems) {
  return elems[Math.round(Math.random() * (elems.length - 1))];
};

// создаём массив JS-объектов из 4х волшенбников со случайными параметрами - имя, цвет мантии и цвет глаз
var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards[wizards.length] = {
    fullName: generateFullName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: randField(COAT_COLORS),
    eyesColor: randField(YEYS_COLORS)
  };
}

/**
 * Функция по созданию DOM-элемента на основе JS объекта волшебника
 * @param {*} wizard
 * @return {wizardElement}
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * Функция заполнения блока DOM-элементами
 * @return {fragment}
 */
var fillFragment = function () {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
};

similarListElement.appendChild(fillFragment());


// убираем класс "hidden" с блока "setup-similar", чтобы отобразить его в DOM
document.querySelector('.setup-similar').classList.remove('hidden');
