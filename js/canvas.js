let clearButton = document.querySelector('#clearButton');
let saveButton = document.querySelector('#saveButton');

// Drawing globals
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paintOn;
let gridVisible = false;
let clickSize = new Array();
let curSize = 10;

// Colors
let colorRed = "#d10d0d";
let colorOrange = "#d16e0d";
let colorYellow = "#e9e600";
let colorGreen = "#0dbd0f";
let colorBlue = "#0e67cb";
let colorPurple = "#aa0cd2";
let curColor = colorRed;
let clickColor = new Array();
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

let canvas = setUpCanvas();
let context = canvas.getContext('2d');

function setUpCanvas() {
  let wrapper = document.querySelector('#canvasWrapper');
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', '500');
  canvas.setAttribute('height', '500');
  canvas.setAttribute('id', 'canvas');
  wrapper.appendChild(canvas);
  if (typeof G_vmlCanvasManager != 'undefined') {
  	canvas = G_vmlCanvasManager.initElement(canvas);
  }
  drawGrid(canvas.getContext('2d'));
  return canvas;
};

function drawGrid(context) {
  let p = 0;
  let bw = 500;
  let bh = 500;
  for (let x = 0; x <= bw; x += 25) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  for (let x = 0; x <= bh; x += 25) {
      context.moveTo(p, 0.5 + x + p);
      context.lineTo(bw + p, 0.5 + x + p);
  }

  context.strokeStyle = "#dedede";
  context.stroke();
}

// Event listeners
saveButton.addEventListener('click', () => save(canvas.getContext("2d").getImageData(0, 0, 500, 500)));

clearButton.addEventListener('click', function() {
  let context = canvas.getContext("2d")
  context.clearRect(0, 0, canvas.width, canvas.height);
  clickX = new Array();
  clickY = new Array();
  drawGrid(context);
});

function setActiveButton(e, buttonList) {
  buttonList.forEach(button => {
    if (button.id != e.target.id) {
      button.classList.remove('active');
    } else {
      button.classList.add('active');
    }
  });
}

redButton.addEventListener('click', function(e) {
  curColor = colorRed;
  setActiveButton(e, colorButtons);
});

orangeButton.addEventListener('click', function(e) {
  curColor = colorOrange;
  setActiveButton(e, colorButtons);
});
yellowButton.addEventListener('click', function(e) {
  curColor = colorYellow;
  setActiveButton(e, colorButtons);
});
greenButton.addEventListener('click', function(e) {
  curColor = colorGreen;
  setActiveButton(e, colorButtons);
});
blueButton.addEventListener('click', function(e) {
  curColor = colorBlue;
  setActiveButton(e, colorButtons);
});
purpleButton.addEventListener('click', function(e) {
  curColor = colorPurple;
  setActiveButton(e, colorButtons);
});

smallLineButton.addEventListener('click', function(e) {
  curSize = 5;
  setActiveButton(e, lineButtons);
});
mediumLineButton.addEventListener('click', function(e) {
  curSize = 10;
  setActiveButton(e, lineButtons);
});
largeLineButton.addEventListener('click', function(e) {
  curSize = 15;
  setActiveButton(e, lineButtons);
});
giantLineButton.addEventListener('click', function(e) {
  curSize = 25;
  setActiveButton(e, lineButtons);
});

canvas.addEventListener('mousemove', function(e) {
  if (paintOn) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

canvas.addEventListener('mouseup', function() {
    paintOn = false;
});

canvas.addEventListener('mouseleave', function() {
    paintOn = false;
});

canvas.addEventListener('mousedown', function(e) {
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;

  paintOn = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

// Drawing functions
let addClick = (x, y, dragging) => {
  clickX.push(x);
  clickY.push(y);
  clickSize.push(curSize);
  clickColor.push(curColor);
}

let redraw = () => {
  context.lineJoin = "round";

  for (var i=0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i-1], clickY[i-1]);
     } else {
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];
     context.lineWidth = curSize[i];
     context.stroke();
  }
}
