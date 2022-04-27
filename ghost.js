const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
import {circleWidth, boundraries, ghosts, pacman, animateid} from "./main.js";
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
class Ghost {
    speed;
    static speed = 1;
    constructor({position, velocity, image}) {
        this.position = position
        this.velocity = velocity;
        this.radius = 11.5;
        this.prevCollisions = []
        this.speed = 1
        this.image = image

    }
    draw() {
        c.drawImage(this.image, this.position.x-10, this.position.y-10)
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
            winningMessageTextElement.innerText = ` Wins!`
            winningMessageElement.classList.add('show')
            cancelAnimationFrame(animateid)
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
