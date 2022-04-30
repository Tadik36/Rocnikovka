const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
class Boundary{
    static width = 30
    static height = 30
    width;
    height;
    color;
    constructor({position, color = 'rgb(118,174,241,1)' }) {
        this.position = position
        this.width = 30;
        this.height = 30;
        this.color = color
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

}
export default Boundary