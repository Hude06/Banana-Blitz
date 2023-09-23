Import("./RectUtils.js");
Import("./Particles.js");
Import("./Player.js");

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let currentKey = new Map();

class Player {
    constructor() {
        this.bounds = new Rect(10,10,10,10);
    }
    draw(){
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h)
    }
    update(){

    }
}

let player = new Player();

loop = function () {
    player.draw();
    player.update();
    requestAnimationFrame(loop);
}

init = function () {
    document.addEventListener("keydown", (e) => {
        currentKey.set(e.key, true);
    });
    document.addEventListener("up", (e) => {
        currentKey.set(e.key, false);
    });
    loop();
}

window.addEventListener("load", init);