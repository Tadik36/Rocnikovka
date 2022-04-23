const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
import {circleWidth, boundraries, ghost} from "./main.js";
class Ghost{
    constructor({position,velocity,color ="red"})
    {
        this.position = position
        this.velocity = velocity;
        this.radius = 11.25;
        this.color = color


    }draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
    update()
    {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

export const Move = () => {
    ghost.forEach(ghost =>{
        ghost.update();
        const collisions = [];
        boundraries.forEach(boundary=>{
            if (circleWidth({
                circle: {
                    ...ghost,
                    velocity: {
                        x: 5,
                        y: 0,
                    }
                }, rectangle: boundary
            })
            ){
                collisions.push('left')
            }if (circleWidth({
                circle: {
                    ...ghost,
                    velocity: {
                        x: -5,
                        y: 0,
                    }
                }, rectangle: boundary
            })
            ){
                collisions.push('left')
            }if (circleWidth({
                circle: {
                    ...ghost,
                    velocity: {
                        x: 0,
                        y: -5,
                    }
                }, rectangle: boundary
            })
            ){
                collisions.push('up')
            }if (circleWidth({
                circle: {
                    ...ghost,
                    velocity: {
                        x: 5,
                        y: 0,
                    }
                }, rectangle: boundary
            })
            ){
                collisions.push('down')
            }
        })
    })
}
export default Ghost
