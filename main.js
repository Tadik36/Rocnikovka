const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const score = document.querySelector('#scoreL');
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
import boundary from "./boundary.js";
import Boundary from "./boundary.js";
import Pacman from "./pacman.js";
import Ghost from "./ghost.js";
import {Move} from "./ghost.js";
let span = document.getElementsByClassName("close")[0];

canvas.height = 480;
canvas.width = 960;

class dot {
    constructor({position}){
        this.position = position
        this.radius = 3;
    }
    draw()
    {
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
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','.','.','.','.','.','.','-','.','.','.','.','.','.','.','.','.','.','.','.','.','.','-','.','.','.','-','.','.','.','.','-'],
    ['-','.','-','-','-','.','-','-','-','.','-','-','-','-','-','.','-','-','-','-','-','.','.','.','-','.','.','.','-','-','.','-'],
    ['-','.','-','.','-','.','-','.','-','.','-',' ','.','.','.','.','-','.','.','.','.','.','-','-','-','-','-','.','.','-','.','-'],
    ['-','.','-','.','-','.','.','.','-','.','-','-','-','-','-','.','-','-','-','.','.','-',' ',' ',' ',' ',' ','-','.','.','.','-'],
    ['-','.','-','.','-','.','-','-','-','.','.','.','.','.','.','.','.','.','.','.','-',' ',' ',' ',' ',' ',' ',' ','-','-','.','-'],
    ['-','.','.','.','-','.','.','.','.','.','-','-','-','-','-','.','-','-','-','.','.','-',' ',' ','-',' ',' ',' ',' ','-','.','-'],
    ['-','.','-','.','.','.','-','-','-','.','-','.','-','.','-','.','-','.','-','-','.','.','-',' ',' ',' ',' ',' ',' ','-','.','-'],
    ['-','.','-','.','-','-','-','.','.','.','-','.','-','.','-','.','-','.','-','.','-','.',' ',' ',' ',' ',' ',' ',' ','-','.','-'],
    ['-','.','-','.','.','.','-','-','-','.','.','.','-','.','-','.','.','.','.','.','.','.','-',' ',' ',' ',' ',' ',' ','-','.','-'],
    ['-','-','-','.','-','.','.','.','.','.','-','.','.','.','-','.','-','.','-','.','.','-',' ',' ',' ',' ',' ',' ',' ','-','.','-'],
    ['-','.','-','.','-','.','-','-','-','-','-','.','-','.','.','.','-','.','-','.','-',' ',' ',' ',' ',' ',' ',' ','-','-','.','-'],
    ['-','.','-','.','-','.','-','.','.','.','.','.','-','.','-','.','-','.','-','.','.','-',' ',' ',' ',' ',' ','-','.','.','.','-'],
    ['-','.','-','.','-','.','-','.','-','-','-','-','-','.','-','.','-','.','-','-','.','-','-','-','-','-','-','-','.','-','.','-'],
    ['-','.','.','.','-','.','.','.','.','.','.','.','-','.','.','.','-','.','.','.','.','.','.','.','.','.','.','.','.','-','.','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
]

map.forEach((row,i) => {
    row.forEach((symbol,j) =>{
        switch (symbol){
            case '-':
                boundraries.push(
                    new Boundary({
                        position:{
                            x:boundary.width*j,
                            y:boundary.height*i
                        }
                    })
                )
                break
            case'.':
                dots.push(
                    new dot({
                        position:{
                            x: j* Boundary.width + Boundary.width/2,
                            y: i* Boundary.height + Boundary.height/2
                        }
                    })
                )
                break
        }
    })
})

export const ghost = [ new Ghost({
    position:{
        x: Boundary.width * 24 + Boundary.width/2,
        y:Boundary.height * 10 + Boundary.height/2
    },
    velocity: {
        x: 0,
        y: 0
    }
})
    ]
const pacman = new Pacman({
    position: {
        x: Boundary.width + Boundary.width/2,
        y: Boundary.height + Boundary.height/2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys={
    w:{
        pressed:false
    },
    a:{
        pressed:false
    },
    s:{
        pressed:false
    },
    d:{
        pressed:false
    }
}
let lastKey = ' '
let score1 = 0;

export const circleWidth = ({circle,rectangle}) => {
    const padding = Boundary.width /2 - circle.radius-1
  return(circle.position.y - circle.radius + circle.velocity.y <= rectangle.
          position.y + rectangle.height + padding &&
      circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.
          x- padding&&
      circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.
          y - padding  &&
      circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.
          x + rectangle.width + padding)
}
const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 1; i < boundraries.length; i++) {
            const boundary = boundraries[i]
            if (circleWidth({
                circle: {
                   ...pacman,
                    velocity: {
                        x:0,
                        y:-1.5,
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
    }if (keys.d.pressed && lastKey === 'd') {
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
        for (let i = 0; i < boundraries.length; i++){
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
            score1 += 10
            score.innerHTML = score1
        }
    })
    Move();
    pacman.update()

}

animate()
addEventListener('keydown',({ key }) => {
    switch (key){
        case 'w':keys.w.pressed = true
            lastKey = 'w'
            break;
        case 's':keys.s.pressed = true
            lastKey = 's'
            break;
        case 'a':keys.a.pressed = true
            lastKey = 'a'
            break;
        case 'd':keys.d.pressed = true
            lastKey = 'd'
            break;
    }
})
addEventListener('keyup',({ key }) => {
    switch (key){
        case 'w':keys.w.pressed = false
            break;
        case 's':keys.s.pressed = false
            break;
        case 'a':keys.a.pressed = false
            break;
        case 'd':keys.d.pressed = false
            break;
    }
})

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

