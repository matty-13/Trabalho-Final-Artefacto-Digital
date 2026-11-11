let mic;
let fibonacci = 1.61803398875;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(15);
  
  // Create an audio input stream (asks user for mic permission)
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  // Clear the screen every frame to animate the motion cleanly
  background(15, 15, 25, 40); // Slight transparency creates a motion blur effect

  // Get the current overall volume (a number between 0.0 and 1.0)
  let vol = mic.getLevel();

  // Map the volume to a growth multiplier
  // Quiet sound = 0.05 growth, Loud sound = up to 0.40 growth
  let growthFactor = map(vol, 0, 1, 0.05, 0.40);
  
  // Map the volume to a dynamic color shift
  let dynamicHue = map(vol, 0, 0.5, 120, 255);

  // Center the spiral grid
  translate(width / 2, height / 2); 
  
  stroke(dynamicHue, 100, 255 - dynamicHue);
  strokeWeight(2 + vol * 10); // Thicker lines when louder
  noFill();

  let angle = 0;
  beginShape();
  // Loop to draw the spiral points live
  for (let i = 0; i < 300; i++) {
    // We add the real-time growth factor to the math
    let r = pow(goldenRatio + growthFactor, angle / HALF_PI) * 2; 
    
    // Convert polar coordinates to X and Y screen pixels
    let x = r * cos(angle);
    let y = r * sin(angle);
    
    vertex(x, y);
    
    // Spin the spiral smoothly over time using frameCount
    angle += 0.1 + sin(frameCount * 0.005) * 0.01; 
  }
  endShape();
}

// Browser security requires a user interaction to turn on the microphone
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
