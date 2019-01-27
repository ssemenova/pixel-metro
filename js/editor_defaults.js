function setActiveButton(e, buttonLists) {
  buttonLists.forEach(buttonList => {
    buttonList.forEach(button => {
      if (button.id != e.target.id) {
        button.classList.remove('active');
      } else {
        button.classList.add('active');
      }
    })
  });
}


// Colors
let newColor = true;
let colorRed = "#d10d0d";
let colorOrange = "#d16e0d";
let colorYellow = "#e9e600";
let colorGreen = "#0dbd0f";
let colorBlue = "#0e67cb";
let colorPurple = "#aa0cd2";
let curColor = colorRed;
let redButton = document.querySelector('#redButton');
let orangeButton = document.querySelector('#orangeButton');
let yellowButton = document.querySelector('#yellowButton');
let greenButton = document.querySelector('#greenButton');
let blueButton = document.querySelector('#blueButton');
let purpleButton = document.querySelector('#purpleButton');
let colorButtons = [
    redButton,
    orangeButton,
    yellowButton,
    greenButton,
    blueButton,
    purpleButton
];

redButton.addEventListener('click', function(e) {
  curColor = colorRed;
  waterDrawOn = false; stationDrawOn = false; newColor = true;
  setActiveButton(e, [colorButtons, featuresButtons]);
});

orangeButton.addEventListener('click', function(e) {
  curColor = colorOrange;
  waterDrawOn = false; stationDrawOn = false; newColor = true;
  setActiveButton(e, [colorButtons, featuresButtons]);
});

yellowButton.addEventListener('click', function(e) {
  curColor = colorYellow;
  waterDrawOn = false; stationDrawOn = false; newColor = true;
  setActiveButton(e, [colorButtons, featuresButtons]);
});

greenButton.addEventListener('click', function(e) {
  curColor = colorGreen;
  waterDrawOn = false; stationDrawOn = false; newColor = true;
  setActiveButton(e, [colorButtons, featuresButtons]);
});

blueButton.addEventListener('click', function(e) {
  curColor = colorBlue;
  waterDrawOn = false; stationDrawOn = false; newColor = true;
  setActiveButton(e, [colorButtons, featuresButtons]);
});

purpleButton.addEventListener('click', function(e) {
  curColor = colorPurple;
  waterDrawOn = false; stationDrawOn = false; newColor = true;
  setActiveButton(e, [colorButtons, featuresButtons]);
});


// Line widths
let smallLineButton = document.querySelector('#smallLineButton');
let mediumLineButton = document.querySelector('#mediumLineButton');
let largeLineButton = document.querySelector('#largeLineButton');
let giantLineButton = document.querySelector('#giantLineButton');
let lineButtons = [
  smallLineButton,
  mediumLineButton,
  largeLineButton,
  giantLineButton
];

smallLineButton.addEventListener('click', function(e) {
  curSize = 5;
  setActiveButton(e, [lineButtons, [stationButton]]);
});

mediumLineButton.addEventListener('click', function(e) {
  curSize = 10;
  setActiveButton(e, [lineButtons, [stationButton]]);
});

largeLineButton.addEventListener('click', function(e) {
  curSize = 15;
  setActiveButton(e, [lineButtons, [stationButton]]);
});

giantLineButton.addEventListener('click', function(e) {
  curSize = 40;
  setActiveButton(e, [lineButtons, [stationButton]]);
});


// Features
let waterDrawOn = false;
let waterButton = document.querySelector('#waterButton');
let waterColor = "#b1d4d5";
waterButton.addEventListener('click', function(e) {
  waterDrawOn = true;
  setActiveButton(e, [featuresButtons, colorButtons]);
});

let stationButton = document.querySelector('#stationButton');
let stationDrawOn = false;
stationButton.addEventListener('click', function(e) {
  stationDrawOn = true;
  setActiveButton(e, [featuresButtons, lineButtons, colorButtons]);
});

let featuresButtons = [waterButton, stationButton];
