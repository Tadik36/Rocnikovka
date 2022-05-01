const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

class Pacman
{
     speed = 3
    constructor({position, velocity})
    {
        this.position = position
        this.velocity = velocity;
        this.radius = 11.5;
        this.life = 2
        this.rotate = 0
        this.speed = 3
        this.MaxOpen= 0.75
        this.MinOpen = 0.12

    }
    draw() {
        c.save()
        c.translate(this.position.x, this.position.y)
        c.rotate(this.rotate)
        c.translate(-this.position.x, -this.position.y)
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, this.MaxOpen, Math.PI * 2-this.MaxOpen)
        c.lineTo(this.position.x, this.position.y)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
        c.restore()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.MaxOpen < 0 || this.MaxOpen > 0.75 )this.MinOpen = -this.MinOpen
            this.MaxOpen += this.MinOpen
    }
}

export default Pacman

