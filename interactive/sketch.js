var serial;
var portName = "COM13";
var sensorValue;

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  serial = new p5.SerialPort();
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);

  serial.on('error', serialError);
  serial.on('close', portClose);

  serial.open(portName);
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function portClose() {
  console.log('The serial port closed.');
}

function serialError() {
  console.log("error");
}

function serialEvent() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) {
    return; // if the string is empty, do no more
  }
  sensorValue = currentString; // save it for the draw method
}

function draw() {
  background(50, 100, 200);
  fill("lavender")


  var x = map(sensorValue, 0, 1023, 0, width);
//  var y = map(sensorValue, 0, 1023, height, 0);
  var y = height/2;

  ellipse(width / 2, y, 100);

  // ground
//  fill(c, c + 75, c);
  rect(0, height * 0.75, width, height * 0.25);
  var offset = 100;

  noStroke();
  circle(x, y, 140, height);
  rect(x, y, 100, height); // face

  stroke("black");
  fill("red");
  ellipse(x - offset, y - offset, 40); // right eye
  ellipse(x + offset, y - offset, 40); // left eye
  rect(x, y + offset, 40, 20, 10); // mouth
  rect(x, y + offset, 150, 168, 50, 100);

  fill('green');

  var w = map(x, 0, width, 100, 300)

  ellipse(x, y, w, 10);
}
