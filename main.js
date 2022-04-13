const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
import Pacman from "./pacman.js";
let span = document.getElementsByClassName("close")[0];

canvas.height = innerHeight/2;
canvas.width = innerWidth/2;

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




const map = [
    ['-','-','-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ',' ','-',' ','-'],
    ['-',' ',' ',' ',' ',' ',' ','-'],
    ['-',' ',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ',' ','-',' ','-'],
    ['-',' ',' ',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-','-','-'],
]
const boundraries = []
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
        }
    })
})
const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    boundraries.forEach((boundary) => {
        boundary.draw()
    })
    pacman.update()
}
animate()
addEventListener('keydown',({ key }) => {
    switch (key){
        case 'w':pacman.velocity.y = -5
            break;
        case 's':pacman.velocity.y = 5
            break;
        case 'a':pacman.velocity.x = -5
            break;
        case 'd':pacman.velocity.x = 5
            break;
    }
    console.log(pacman.velocity)
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

