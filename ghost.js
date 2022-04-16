const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
class Ghost{
    constructor({position, velocity})
    {
        this.position = position
        this.velocity = velocity;
        this.radius = 13;
    }
}
