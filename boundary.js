const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
class Boundary{
    static width = 30
    static height = 30
    width;
    height;
    constructor({position}) {
        this.position = position
        this.width = 30;
        this.height = 30;
    }
    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
export default Boundary