class Asteroid {
    constructor(size, distanceFromSun, rotationSpeed) {
        this.size = size;
        this.distanceFromSun = distanceFromSun;
        this.rotationSpeed = rotationSpeed;
        this.texture = moonTexture;
        this.angle = random(TWO_PI);
        this.x = 0;
        this.z = 0;
    }

    update() {
        this.angle = (this.angle + this.rotationSpeed) % TWO_PI;
        this.x = cos(this.angle) * this.distanceFromSun;
        this.z = sin(this.angle) * this.distanceFromSun;
    }

    draw() {
        push();
        rotateY(-this.angle);
        scale(1,1,3);
        translate(this.distanceFromSun, 0, 0);     
        texture(this.texture);
        sphere(this.size, 10, 10);
        pop();
    }
}