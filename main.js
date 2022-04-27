const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const score = document.querySelector('#scoreL');
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const startButton = document.querySelector('#start-button');
import Boundary from "./boundary.js";
import Pacman from "./pacman.js";
import Ghost from "./ghost.js";
import {Move} from "./ghost.js";
let span = document.getElementsByClassName("close")[0];
canvas.height = 480;
canvas.width = 960;

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


const dots = []
export const boundraries = []
const map = [
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', '.', '.', '-', '.', '.', '.', '.', '-'],
    ['-', '.', '-', '-', '-', '.', '-', '-', '-', '.', '-', '-', '-', '-', '-', '.', '-', '-', '-', '-', '-', '.', '.', '.', '-', '.', '.', '.', '-', '-', '.', '-'],
    ['-', '.', '-', '.', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', '-', '-', '-', '-', '.', '.', '-', '.', '-'],
    ['-', '.', '-', '.', '-', '.', '.', '.', '-', '.', '-', '-', '-', '-', '-', '-', '-', '-', '-', '.', '-', '-', ' ', ' ', ' ', ' ', ' ', '-', '.', '.', '.', '-'],
    ['-', '.', '-', '.', '-', '.', '-', '-', '-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', ' ', ' ', ' ', '-', ' ', ' ', ' ', '-', '-', '.', '-'],
    ['-', '.', '.', '.', '-', '.', '.', '.', '.', '.', '-', '-', '-', '-', '-', '.', '-', '.', '-', '.', '.', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '.', '-'],
    ['-', '.', '-', '.', '-', '.', '-', '-', '-', '.', '-', '.', '.', '.', '-', '.', '-', '.', '-', '-', '.', '.', '-', ';', ';', ';', ';', ';', ';', '-', '.', '-'],
    ['-', '.', '-', '.', '-', '.', '-', '-', '-', '.', '-', '.', '-', '.', '-', '.', '-', '.', '-', '-', '-', '.', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '.', '-'],
    ['-', '.', '-', '.', '.', '.', '-', '-', '-', '.', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', ';', ';', ';', ';', ';', ';', '-', '.', '-'],
    ['-', '.', '-', '.', '-', '.', '.', '.', '.', '.', '-', '.', '-', '.', '-', '.', '-', '.', '-', '.', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '.', '-'],
    ['-', '.', '-', '.', '-', '.', '-', '-', '-', '-', '-', '.', '-', '.', '-', '.', '-', '.', '-', '.', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '.', '-'],
    ['-', '.', '-', '.', '-', '.', '-', '.', '.', '.', '.', '.', '-', '.', '-', '.', '-', '.', '-', '.', '.', '-', ' ', ' ', ' ', ' ', ' ', '-', '.', '.', '.', '-'],
    ['-', '.', '-', '.', '-', '.', '-', '.', '-', '-', '-', '.', '-', '.', '-', '.', '-', '.', '-', '-', '.', '-', '-', '-', '-', '-', '-', '-', '.', '-', '.', '-'],
    ['-', '.', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '-', '.', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
]
    const f = () => {
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundraries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width*j ,
                            y: Boundary.height*i
                        }
                    })
                )
                break
            case ';':
                boundraries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        },color:'black'
                    })
                )
                break
            case'.':
                dots.push(
                    new dot({
                        position: {
                            x: j * Boundary.width + Boundary.width / 2,
                            y: i * Boundary.height + Boundary.height / 2
                        }
                    })
                )
                break
        }
    })
})
    }
const imagei = new Image()
imagei.src = './img/Background.png'
const imagey= new Image()
imagey.src = './img/Ghost2.png'
const imager= new Image()
imager.src = './img/Ghost3.png'
const imageo= new Image()
imageo.src = './img/Ghost4.png'



    export let ghosts = [
        new Ghost({
            position: {
                x: Boundary.width * 26 + Boundary.width / 2,
                y: Boundary.height * 8 + Boundary.height / 2
            },
            velocity: {
                x: Ghost.speed,
                y: 0
            },
            image: imagei

        }),
        new Ghost({
            position: {
                x: Boundary.width * 27 + Boundary.width / 2,
                y: Boundary.height * 8 + Boundary.height / 2
            },
            velocity: {
                x: Ghost.speed,
                y: 0
            },
            image: imagey
        }),
        new Ghost({
            position: {
                x: Boundary.width * 24 + Boundary.width / 2,
                y: Boundary.height * 8 + Boundary.height / 2
            },
            velocity: {
                x: -Ghost.speed,
                y: 0
            },
            image: imager
        }),
        new Ghost({
            position: {
                x: Boundary.width * 25 + Boundary.width / 2,
                y: Boundary.height * 8 + Boundary.height / 2
            },
            velocity: {
                x: -Ghost.speed,
                y: 0
            },
            image: imageo
        })
    ]

export const pacman = new Pacman({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
let lastKey = ' '
let score1 = 0;

export const circleWidth = ({circle, rectangle}) => {
    const padding = Boundary.width / 2 - circle.radius - 1
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding)
}
f()
export let animateid;
let boelan1 = false;

document.getElementById('start-button').onclick = function () {
    startButton.disabled = true;
    boelan1 = true;
}

export const animate = () => {
    if (boelan1){
       animateid = requestAnimationFrame(animate)
    }

    if (dots.length === 0) {

        winningMessageTextElement.innerText = ` Wins!`
        winningMessageElement.classList.add('show')
        cancelAnimationFrame(animateid)
    }

    c.clearRect(0, 0, canvas.width, canvas.height)
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 1; i < boundraries.length; i++) {
            const boundary = boundraries[i]
            if (circleWidth({
                circle: {
                    ...pacman,
                    velocity: {
                        x: 0,
                        y: -1.5,
                    }
                }, rectangle: boundary
            })) {
                pacman.velocity.y = 0
                break
            } else {
                pacman.velocity.y = -1.5
            }
        }

    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundraries.length; i++) {
            const boundary = boundraries[i]
            if (circleWidth({
                circle: {
                    ...pacman,
                    velocity: {
                        x: -1.5,
                        y: 0,
                    }
                }, rectangle: boundary
            })) {
                pacman.velocity.x = 0
                break
            } else {
                pacman.velocity.x = -1.5
            }
        }
    }
    if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundraries.length; i++) {
            const boundary = boundraries[i]
            if (circleWidth({
                circle: {
                    ...pacman,
                    velocity: {
                        x: 1.5,
                        y: 0,
                    }
                }, rectangle: boundary
            })) {
                pacman.velocity.x = 0
                break
            } else {
                pacman.velocity.x = 1.5
            }
        }
    } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundraries.length; i++) {
            const boundary = boundraries[i]
            if (circleWidth({
                circle: {
                    ...pacman,
                    velocity: {
                        x: 0,
                        y: 1.5,
                    }
                }, rectangle: boundary
            })) {
                pacman.velocity.y = 0
                break
            } else {
                pacman.velocity.y = 1.5
            }
        }
    }

    boundraries.forEach((boundary) => {
        boundary.draw()
        if (circleWidth({
                circle: pacman,
                rectangle: boundary
            }
        )) {
            pacman.velocity.y = 0
            pacman.velocity.x = 0
        }
    })
    dots.forEach((dot, i) => {
        dot.draw();
        if (Math.hypot(dot.position.x - pacman.position.x,
            dot.position.y - pacman.position.y) < dot.radius + pacman.radius) {
            dots.splice(i, 1)
            score.innerHTML = score1
        }
    })
    pacman.update()
    Move()
}


addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break;
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break;
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
    }
})
addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false
            break;
        case 's':
            keys.s.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
    }
})

btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
const reset = () => {
    winningMessageElement.classList.remove('show')
    score1 = 0;
    f()
    pacman.position.x = Boundary.width + Boundary.width / 2
    pacman.position.y = Boundary.height + Boundary.height / 2
    ghosts[0].position.x=Boundary.width * 26 + Boundary.width / 2
    ghosts[0].position.y=Boundary.height * 8 + Boundary.height / 2
    ghosts[0].velocity.x=Ghost.speed
    ghosts[0].velocity.y=0
    ghosts[1].position.x=Boundary.width * 27 + Boundary.width / 2
    ghosts[1].position.y=Boundary.height * 8 + Boundary.height / 2
    ghosts[1].velocity.x=Ghost.speed
    ghosts[1].velocity.y=0
    ghosts[2].position.x=Boundary.width * 25 + Boundary.width / 2
    ghosts[2].position.y=Boundary.height * 8 + Boundary.height / 2
    ghosts[2].velocity.x=-Ghost.speed
    ghosts[2].velocity.y=0
    ghosts[3].position.x=Boundary.width * 24 + Boundary.width / 2
    ghosts[3].position.y=Boundary.height * 8 + Boundary.height / 2
    ghosts[3].velocity.x=-Ghost.speed
    ghosts[3].velocity.y=0

    animate()

    startButton.disabled = false;
    boelan1 = false;
    cancelAnimationFrame(animate)
}
animate()
restartButton.addEventListener('click', reset)
startButton.addEventListener('click', animate);
