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
        this.speed = 2;
    }
    draw() {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.sprite.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {
        if (currentKey.get("w") || currentKey.get("ArrowUp")) {
            this.bounds.y -= this.speed
        }
        if (currentKey.get("s") || currentKey.get("ArrowDown")) {
            this.bounds.y += this.speed
        }
        if (currentKey.get("a") || currentKey.get("ArrowLeft")) {
            this.bounds.x -= this.speed
        }
        if (currentKey.get("d") || currentKey.get("ArrowRight")) {
            this.bounds.x += this.speed
        }
    }
}
function keyboardInit() {
    window.addEventListener("keydown", function (event) {
        currentKey.set(event.key, true);
    });
    window.addEventListener("keyup", function (event) {
        currentKey.set(event.key, false);
    });
}
let Banana = new SpriteOBJ("./Assets/Player.png")
let player = new Player(Banana);
function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    player.draw();
    player.update();

    requestAnimationFrame(loop)
}
function init() {
    keyboardInit();
    loop();
}
init();