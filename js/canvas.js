// Set up canvas
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
  context.moveTo(0, 0);
  for (let x = 0; x <= bw; x += 25) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  for (let x = 0; x <= bh; x += 25) {
      context.moveTo(p, 0.5 + x + p);
      context.lineTo(bw + p, 0.5 + x + p);
  }

  context.strokeStyle = "#dedede";
  context.lineWidth = 1;
  context.stroke();
}


// Drawing globals
let clickX = new Array();
let clickY = new Array();
let clickSize = new Array();
let clickColor = new Array();
let clickDrag = new Array();
let curSize = 10;

let stationsX = new Array();
let stationsY = new Array();

let waterX = new Array();
let waterY = new Array();
let waterDrag = new Array();
let waterSize = new Array();

let canDraw = false;
let strokeCount = 0;
let lastStroke = '';


// Editor save and clear buttons
let clearButton = document.querySelector('#clearButton');
clearButton.addEventListener('click', () => {
  let context = canvas.getContext("2d")
  context.clearRect(0, 0, canvas.width, canvas.height);

  clickX = new Array();
  clickY = new Array();
  clickSize = new Array();
  clickColor = new Array();
  clickDrag = new Array();
  curSize = 10;

  stationsX = new Array();
  stationsY = new Array();

  waterX = new Array();
  waterY = new Array();
  waterDrag = new Array();
  waterSize = new Array();

  strokeCount = 0;
  lastStroke = '';

  drawGrid(context);
});

let saveButton = document.querySelector('#saveButton');
saveButton.addEventListener('click', () => save(canvas.getContext("2d").getImageData(0, 0, 500, 500)));

let undoButton = document.querySelector('#undoButton');
undoButton.addEventListener('click', () => {
  if (lastStroke === "water") {
    waterX = waterX.slice(0, waterX.length - strokeCount);
    waterY = waterY.slice(0, waterY.length - strokeCount);
    waterSize = waterSize.slice(0, waterSize.length - strokeCount);
    waterDrag = waterDrag.slice(0, waterSize.length - strokeCount);
  } else if (lastStroke === "station") {
    stationsX = stationsX.slice(0, stationsX.length - 1);
    stationsY = stationsY.slice(0, stationsY.length - 1);
  } else if (lastStroke === "metro") {
    clickX = clickX.slice(0, clickX.length - strokeCount);
    clickY = clickY.slice(0, clickY.length - strokeCount);
    clickSize = clickSize.slice(0, clickSize.length - strokeCount);
    clickColor = clickColor.slice(0, clickColor.length - strokeCount);
    clickDrag = clickDrag.slice(0, clickDrag.length - strokeCount);
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(context);
  redraw();
  strokeCount = 0;
});


// Canvas event listeners
canvas.addEventListener('mousemove', function(e) {
  if (waterDrawOn && canDraw) {
    var bounds = e.target.getBoundingClientRect();
    x = e.pageX - bounds.left - scrollX;
    y = e.pageY - bounds.top - scrollY;

    addClick(x, y, true);
    redraw();
  }
});

canvas.addEventListener('mouseup', () => { canDraw = false });
canvas.addEventListener('mouseleave', () => { canDraw = false });

canvas.addEventListener('mousedown', function(e) {
  let bounds = e.target.getBoundingClientRect();
  strokeCount = 0;
  canDraw = true;
  x = e.pageX - bounds.left - scrollX;
  y = e.pageY - bounds.top - scrollY;

  addClick(x, y, !newColor);
  newColor = false;
  redraw();
});


// Drawing functions
let addClick = (x, y, dragging) => {
  strokeCount++;
  if (!waterDrawOn && !stationDrawOn) {
    clickX.push(x);
    clickY.push(y);

    clickSize.push(curSize);
    clickColor.push(curColor);
    clickDrag.push(dragging);
    lastStroke = "metro";
  } else if (waterDrawOn) {
    waterX.push(x);
    waterY.push(y);
    waterDrag.push(dragging);
    waterSize.push(curSize);
    lastStroke = "water";
  } else if (stationDrawOn) {
    stationsX.push(x);
    stationsY.push(y);
    lastStroke = "station";
  }
}

let redraw = () => {
  context.lineJoin = "round";

  for (let i = 0; i < waterX.length; i++) {
    context.beginPath();
    if (waterDrag[i] && i) {
      context.moveTo(waterX[i-1], waterY[i-1]);
     } else {
      context.moveTo(waterX[i]-1, waterY[i]);
     }
     context.lineTo(waterX[i], waterY[i]);
     context.closePath();
     context.strokeStyle = waterColor;
     context.lineWidth = waterSize[i];
     context.stroke();
  }

  for (let i=0; i < clickX.length; i++) {
    context.beginPath();
    if (clickX.length > 1 && clickDrag[i]) {
      context.moveTo(clickX[i-1], clickY[i-1]);
    } else {
      context.moveTo(clickX[0]-.5, clickY[0]-.5);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = clickSize[i];
    context.stroke();
  }
}
