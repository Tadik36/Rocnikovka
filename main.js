const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

canvas.height =550;
canvas.width = 770;

class Boundary{
    static width = 60
    static height = 60
    constructor({position}) {
        this.position = position
        this.width = 40;
        this.height = 40;
    }


    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

class Pacman {
    constructor(position,velocity) {
            this.position = position
            this.velocity =velocity
            this.radius = 10
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius, 0, Math.PI *2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }
}

const map = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-'],
]
const boundraries = []
const pacman = new Pacman({
    position: {
        x: Boundary.width + Boundary.width/2,
        y: Boundary.height + Boundary.width/2
    },
    velocity:{
    x:0,
    y:0
}
})
pacman.draw()

map.forEach((row,i) => {
    row.forEach((symbol,j) =>{
        switch (symbol){
            case '-':
                boundraries.push(
                    new Boundary({
                        position:{
                            x:40*j,
                            y:40*i
                        }
                    })
                )
        }
    })
})
boundraries.forEach((boundary) => {
    boundary.draw();
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