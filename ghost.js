const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
import {circleWidth, boundraries, ghosts, pacman, animateid} from "./main.js";
class Ghost {
    speed;
    static speed = 1;
    constructor({position, velocity, color, image}) {
        this.position = position
        this.velocity = velocity;
        this.radius = 11.5;
        this.color = color
        this.prevCollisions = []
        this.speed = 1
        this.image = image

    }

    draw() {
        c.beginPath()
        c.drawImage(this.image, this.position.x, this.position.y)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

export const Move = () => {
    ghosts.forEach(ghost => {
        ghost.update();
        if (
            Math.hypot(ghost.position.x - pacman.position.x,
                ghost.position.y - pacman.position.y) < ghost.radius + pacman.radius
        ) {
            cancelAnimationFrame(animateid)
            setTimeout(function () {
                alert("You have lose!");
            }, 500)
            let newElement = document.createElement('div')
            newElement.innerHTML = "You have lose"
            document.body.appendChild(newElement)
        }

        const collisions = [];
        boundraries.forEach(boundary => {
            if (!collisions.includes('left') && circleWidth({
                circle: {
                    ...ghost,
                    velocity: {
                        x: -ghost.speed,
                        y: 0,
                    }
                }, rectangle: boundary
            })
            ) {
                collisions.push('left')
            }
            if (!collisions.includes('right') && circleWidth({
                circle: {
                    ...ghost,
                    velocity: {
                        x: ghost.speed,
                        y: 0,
                    }
                }, rectangle: boundary
            })
            ) {
                collisions.push('right')
            }
            if (!collisions.includes('up') && circleWidth({
                circle: {
                    ...ghost,
                    velocity: {
                        x: 0,
                        y: -ghost.speed,
                    }
                }, rectangle: boundary
            })
            ) {
                collisions.push('up')
            }
            if (!collisions.includes('down') && circleWidth({
                circle: {
                    ...ghost,
                    velocity: {
                        x: 0,
                        y: ghost.speed,
                    }
                }, rectangle: boundary
            })
            ) {
                collisions.push('down')
            }
        })
        if (collisions.length > ghost.prevCollisions.length) {
            ghost.prevCollisions = collisions
        }
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {

            if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
            else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
            else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
            else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

            const pathways = ghost.prevCollisions.filter((collision) => {
                return !collisions.includes(collision)
            })
            const direction = pathways[Math.floor(Math.random() * pathways.length)]
            switch (direction) {
                case'down' :
                    ghost.velocity.y = ghost.speed
                    ghost.velocity.x = 0
                    break

                case'up' :
                    ghost.velocity.y = -ghost.speed
                    ghost.velocity.x = 0
                    break

                case'right' :
                    ghost.velocity.y = 0
                    ghost.velocity.x = ghost.speed
                    break

                case'left' :
                    ghost.velocity.y = 0
                    ghost.velocity.x = -ghost.speed
                    break
            }
            ghost.prevCollisions = []
        }
    })

}

export default Ghost
