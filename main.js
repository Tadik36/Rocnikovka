const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const score = document.querySelector('#scoreL');
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
import Boundary from "./boundary.js";
import Pacman from "./pacman.js";
let span = document.getElementsByClassName("close")[0];

canvas.height = 480;
canvas.width = 960;

const map = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
    ['-','.','.','.','.','.','.','-','.','.','.','.','.','.','.','.','.','.','.','.','.','.','-','.','-','.','-','.','.','.','.','-'],
    ['-','.','-','-','-','.','-','-','-','.','-','-','-','-','-','.','-','-','-','-','-','.','.','.','.','.','.','.','-','-','.','-'],
    ['-','.','-','.','-','.','-','.','-','.','-',' ','.','.','.','.','-','.','.','.','.','.','-','-','-','-','-',' ','.','-','.','-'],
    ['-','.','-','.','-','.','.','.','-','.','-','-','-','-','-','.','-','-','-','.','.','-',' ',' ',' ',' ',' ','-','.','.','.','-'],
    ['-','.','-','.','-','.','-','-','-','.','.','.','.','.','.','.','.','.','.','.','-',' ',' ',' ',' ',' ',' ',' ','-',' ','.','-'],
    ['-','.','.','.','-','.','.','.','.','.','-','-','-','-','-','.','-','-','-','.','.','-',' ',' ','-',' ',' ',' ',' ','-','.','-'],
    ['-','.','-','.','.','.','-','-','-','.','-','.','-','.','-','.','-','.','-','-','.','.','-',' ',' ',' ',' ',' ',' ','-','.','-'],
    ['-','.','-','.','-','-','-','.','.','.','-','.','-','.','-','.','-','.','-','.','-','.',' ',' ',' ',' ',' ',' ',' ','-','.','-'],
    ['-','.','-','.','.','.','-','-','-','.','.','.','-','.','-','.','.','.',' ','.','.','.','-',' ',' ',' ',' ',' ',' ','-','.','-'],
    ['-','-','-','.','-','.','.','.','.','.','-','.','.','.','-','.','-','.','-','.','.','-',' ',' ',' ',' ',' ',' ',' ','-','.','-'],
    ['-','.','-','.','-','.','-','-','-','-','-','.','-','.','.','.','-','.','-','.','-',' ',' ',' ',' ',' ',' ',' ','-','.','.','-'],
    ['-','.','-','.','-','.','-','.','.','-','.','.','-','.','-','.','-','-','-','.','.','-',' ',' ',' ',' ',' ','-','.','.','.','-'],
    ['-','.','-','.','-','.','-','.','-','-','-','-','-','.','-','.','-','.','-','-','.','.','-','-','-','-','-','.','.','-','.','-'],
    ['-','.','.','.','-','.','.','.','.','.','.','.','-','.','.','.','-','.',' ',' ','.','.','.','.','.','.','.','.','.','-','.','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
]
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
const boundraries = []
const dots = []
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

map.forEach((row,i) => {
    row.forEach((symbol,j) =>{
        switch (symbol){
            case '-':
                boundraries.push(
                    new Boundary({
                        position:{
                            x:30*j,
                            y:30*i
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
let lastKey = ''
let score1 = 0;
const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    boundraries.forEach((boundary) => {
        boundary.draw()
        if (pacman.position.y - pacman.radius +pacman.velocity.y <= boundary.
            position.y + boundary.height&&
            pacman.position.x + pacman.radius +pacman.velocity.x >= boundary.position.
                x &&
            pacman.position.y + pacman.radius +pacman.velocity.y >= boundary.position.
                y &&
            pacman.position.x - pacman.radius +pacman.velocity.x <= boundary.position.
                x + boundary.width){
            pacman.velocity.y=0
            pacman.velocity.x=0
        }
})
    dots.forEach((dot,i) => {
        dot.draw();
        if (Math.hypot(dot.position.x - pacman.position.x,
            dot.position.y - pacman.position.y) < dot.radius + pacman.radius){
            dots.splice(i,1)
            score1 += 10
            score.innerHTML = score1
        }

            })
    pacman.update()

    if (keys.w.pressed && lastKey === 'w'){
        pacman.velocity.y = -1
    }else if (keys.a.pressed&& lastKey === 'a'){
        pacman.velocity.x = -1
    }if (keys.d.pressed&& lastKey === 'd'){
        pacman.velocity.x = 1
    }else if (keys.s.pressed&& lastKey === 's'){
        pacman.velocity.y = 1
    }
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


