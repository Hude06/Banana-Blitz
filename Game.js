import {Rect} from "./RectUtils.js"

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let currentKey = new Map();
class SpriteOBJ {
    constructor(src) {
        this.image = new Image();
        this.image.src = src;
    }
}
class Player {
    constructor(SpriteOBJ) {
        this.sprite = SpriteOBJ
        this.bounds = new Rect(10,10,64,64)
    }
    draw() {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.sprite.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {

    }
}
let Banana = new SpriteOBJ("./Assets/Player.png")
let player = new Player(Banana);
function loop() {
    player.draw();
    requestAnimationFrame(loop)
}
function init() {
    loop();
}
init();