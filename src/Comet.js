class Comet {
    constructor(xOrbitDistance, yOrbitDistance, diameter, daysToYear) {
        this.xOrbitDistance = xOrbitDistance;
        this.yOrbitDistance = yOrbitDistance;
        this.diameter = diameter;

        this.angleIncrementer = TWO_PI/daysToYear;
        this.angle = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.showOrbit = false;
    }

    update() {
        this.angle = (this.angle + this.angleIncrementer) % TWO_PI;
        this.x = cos(this.angle) * this.xOrbitDistance;
        this.y = sin(this.angle) * this.yOrbitDistance;
    }

    draw() {
        push();
        if (this.showOrbit) {
            push()
            ambientLight(255,255,255);
            scale(1,this.yOrbitDistance/this.xOrbitDistance,1);
            torus(this.xOrbitDistance,3,150,2);
            pop();
        }

        push();
        translate(this.x, this.y, this.z);
        sphere(this.diameter/2, 100, 100);
        pop();
        pop();
    }

    toggleOrbit(){
        this.showOrbit = !this.showOrbit;
    }

    getCoords(){
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }
}