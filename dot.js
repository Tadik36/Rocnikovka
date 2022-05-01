const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
class dot {
    constructor({position}) {
        this.position = position
        this.radius = 3;
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
}
export default dot