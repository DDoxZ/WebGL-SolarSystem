class Astro {
    constructor(name, diameter, distanceFromSun, daysToYear, texture) {
        this.name = name;
        this.diameter = diameter;
        this.distanceFromSun = distanceFromSun;
        this.texture = texture;
        this.angleIncrementer = TWO_PI/daysToYear;
        this.angle = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.showOrbit = false;

        if (name === "earth"){
            this.moon = new Astro("moon", 15, 50, -100, moonTexture);
        }
    }

    update() {
        this.angle = (this.angle + this.angleIncrementer) % TWO_PI;
        this.x = cos(this.angle) * this.distanceFromSun;
        this.z = sin(this.angle) * this.distanceFromSun;

        if (this.name === "earth")
            this.moon.update();
    }

    draw() {
        if (this.showOrbit) {
            push()
            ambientLight(255,255,255);
            rotateX(PI/2);
            torus(this.distanceFromSun, 3, 100, 2);
            pop();
        }
        push();
        translate(this.x, this.y, this.z);

        if (this.name === "earth")
            this.moon.draw();
        
        texture(this.texture);
        sphere(this.diameter/2, 100, 100);
        if (this.name === "saturn"){
            ambientLight(255,255,255);
            rotateX(PI/2);
            torus(150, 35, 100, 2);
        }
        pop();

        if (this.name === "sun"){
            pointLight(255,255,255,0,0,0);
            pointLight(255,255,255,0,0,0);
        }
    }

    toggleOrbit(){
        this.showOrbit = !this.showOrbit;

        if (this.name === "earth")
            this.moon.toggleOrbit();
    }

    getCoords(){
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }
}