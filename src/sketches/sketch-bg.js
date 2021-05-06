const sketch = (p5) => {
    const particles = []

    p5.setup = () => {
        p5.createCanvas(document.body.offsetWidth, document.body.offsetHeight)

        const particlesL = document.body.offsetWidth / 4
        for (let i = 0; i < particlesL; i++) {
            particles.push(new Particle(Math.floor(p5.random(12, 32)), Math.floor(p5.random(25, 250))))
        }
    }

    p5.draw = () => {
        p5.background(0)
        //map background to dark abyss
        particles.forEach((p, index) => {
            //slice and start checking from index
            p.update()
            p.render()
            p.edges()
        })
    }

    p5.windowResized = () => {
        p5.resizeCanvas(document.body.offsetWidth, document.body.clientHeight)
    }


    class Particle {
        constructor(size, color) {
            this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height))
            this.vel = p5.createVector(p5.random(-0.5, 0.5), p5.random(-0.5, 0.5))
            this.size = size
            this.color = color
        }

        update() {
            this.pos.add(this.vel)
        }

        render() {
            p5.fill(76, this.color, 4, 100)
            p5.text('?', this.pos.x, this.pos.y)
            p5.textSize(this.size)
        }

        edges() {
            //bounce particle on x edge
            if (this.pos.x < 0 || this.pos.x > p5.width -6) {
                this.vel.x *= -1
            }
            //bounce particle on y edge
            if (this.pos.y < 10 || this.pos.y > p5.height) {
                this.vel.y *= -1
            }
        }
    }
}

export default sketch