class boids {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();

    this.maxSpeed = 5;
    this.maxForce = 0.2;
    this.viewAngle = Math.PI;

    this.radius = 10; //random(5,12);
    this.R = random(100, 255);
    this.G = random(100, 255);
    this.B = random(100, 255);
  }

  checkFOV(bird, distan, radius) {
    if (distan > radius) {
      return false;
    }
    let y = bird.position.y - this.position.y;
    let x = bird.position.x - this.position.x;
    let angle = Math.atan2(y, x) + Math.PI;
    let rAngle = this.position.heading() + (this.viewAngle / 2);
    let lAngle = this.position.heading() - (this.viewAngle / 2);
    angle = degrees(angle);
    lAngle = degrees(lAngle);
    rAngle = degrees(rAngle);

    angle = (360 + (angle%360)) %360;
    lAngle = (3600000 + lAngle) %360;
    rAngle = (3600000 + rAngle) %360;
    if(lAngle < rAngle)
      return lAngle <= angle && angle <= rAngle;
    return lAngle <= angle || angle <= rAngle;

  }

  align(birds, af) {
    let perceptionRadius = 25;
    let steer = createVector();
    let ctr = 0;
    for (let bird of birds) {
      let distan = dist(this.position.x, this.position.y, bird.position.x, bird.position.y);
      if (this.position != bird.position && this.checkFOV(bird, distan,perceptionRadius)) {
        steer.add(bird.velocity);
        ctr++;
      }
    }
    if (ctr > 0) {
      steer.div(ctr);
      steer.setMag(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    this.acceleration.add(steer.mult(s1.value()));
  }

  cohese(birds) {
    let perceptionRadius = 50;
    let steer = createVector();
    let ctr = 0;
    for (let bird of birds) {
      let distan = dist(this.position.x, this.position.y, bird.position.x, bird.position.y);
      if (this.position != bird.position && this.checkFOV(bird,distan,perceptionRadius)) {
        steer.add(bird.position);
        ctr++;
      }
    }
    if (ctr > 0) {
      steer.div(ctr);
      //steer.setMag(this.maxSpeed);
      steer.sub(this.position);
      steer.limit(this.maxForce);
    }
    this.acceleration.add(steer.mult(s2.value()));
  }

  repulse(birds) {
    let perceptionRadius = 24;
    let steer = createVector();
    let ctr = 0;
    for (let bird of birds) {
      let distan = dist(this.position.x, this.position.y, bird.position.x, bird.position.y);
      if (this.position != bird.position && this.checkFOV(bird,distan,perceptionRadius)) {
        let d = p5.Vector.sub(this.position, bird.position);
        d.div(distan);
        steer.add(d);
        ctr++;
      }
    }

    if (ctr > 0) {
      steer.div(ctr);
      steer.setMag(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce * 1.5);
    }
    this.acceleration.add(steer.mult(s3.value()));
  }




  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(this.R, this.G, this.B);
    strokeWeight(this.radius)

    let v = createVector();
    v.add(this.velocity);
    v.setMag(8);
    strokeWeight(3);
    v.add(this.position);
    line(this.position.x, this.position.y, v.x, v.y)
  }

  stayOnScreen() {
    if (this.position.x > width)
      this.position.x = 0;
    else if (this.position.x < 0)
      this.position.x = width;

    if (this.position.y > height)
      this.position.y = 0;
    else if (this.position.y < 0)
      this.position.y = height;
  }
}
