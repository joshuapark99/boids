const flock = [];

function setup () {
  createCanvas(windowHeight , windowWidth);
  s1 = createSlider(0, 2, 1.5, 0.1);
  s1.position(10, 10);
  s2 = createSlider(0, 2, 1, 0.1);
  s2.position(160, 10);
  s3 = createSlider(0, 2, 2, 0.1);
  s3.position(320, 10);

  for (let i = 0; i < 100; i++) {
    flock.push(new boids());
  }
}

function draw() {
  background(0);

  for (let b of flock) {
    b.align(flock);
    b.cohese(flock);
    b.repulse(flock);
    b.move();
    b.stayOnScreen();
    b.show();
  }

  // noFill();
  // beginShape();
  // endShape();
}
