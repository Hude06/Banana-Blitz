import {Rect} from "./RectUtils.js"

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let currentKey = new Map();
let navKey = new Map();

class SpriteOBJ {
    constructor(LeftSrc,RightSrc,BackLeft,BackRight) {
        this.imageLeft = new Image();
        this.imageLeft.src = LeftSrc;
        this.imageRight = new Image();
        this.imageRight.src = RightSrc;

        this.imageBackLeft = new Image();
        this.imageBackLeft.src = BackLeft;
        this.imageBackRight = new Image();
        this.imageBackRight.src = BackRight;
    }
}
class Bullet {
    constructor(player,direction) {
        this.bounds = new Rect(player.bounds.x,player.bounds.y,26,26)
        this.speed = 4;
        this.visible = true;
        this.direction = direction
        this.image = new Image();
        this.image.src = "./Assets/Bullet.png"
    }
    update() {
    if (this.direction === "up") {
        this.bounds.y -= this.speed
    }
    if (this.direction === "down") {
        this.bounds.y += this.speed
    }
    if (this.direction === "left") {
        this.bounds.x -= this.speed
    }
    if (this.direction === "right") {
        this.bounds.x += this.speed
    }
    }
    draw() {
        ctx.drawImage(this.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
    }
}
class Player { 
    constructor(SpriteOBJ) {
        this.sprite = SpriteOBJ
        this.bounds = new Rect(10,10,64,64)
        this.speed = 2;
        this.direction = "left"
        this.prevDirection = "left"

    }
    draw() {
        ctx.imageSmoothingEnabled = false;
        if (this.direction === "up") {
            console.log("run",this.prevDirection)
            if (this.prevDirection === "left") {
                ctx.drawImage(this.sprite.imageBackLeft,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)

            }
            if (this.prevDirection === "right") {
                ctx.drawImage(this.sprite.imageBackRight,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)

            }
        }
        if (this.direction === "left") {
            ctx.drawImage(this.sprite.imageLeft,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)

        }
        if (this.direction === "right"|| this.direction === "down") {
            ctx.drawImage(this.sprite.imageRight,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)

        }
        
    }
    update() {
        if (currentKey.get("w") || currentKey.get("ArrowUp")) {
            this.bounds.y -= this.speed
            this.direction = "up"
        }
        if (currentKey.get("s") || currentKey.get("ArrowDown")) {
            this.bounds.y += this.speed
            this.direction = "down"
        }
        if (currentKey.get("a") || currentKey.get("ArrowLeft")) {
            this.bounds.x -= this.speed
            this.prevDirection = this.direction;
            this.direction = "left"
        }
        if (currentKey.get("d") || currentKey.get("ArrowRight")) {
            this.bounds.x += this.speed
            this.prevDirection = this.direction;
            this.direction = "right"
        }
        if (navKey.get(" ")) {
            bullets.push (new Bullet(this,this.direction))

        }
    }
}
function keyboardInit() {
    window.addEventListener("keydown", function (event) {
        currentKey.set(event.key, true);
        navKey.set(event.key, true);

    });
    window.addEventListener("keyup", function (event) {
        currentKey.set(event.key, false);
        navKey.set(event.key, false);

    });
}
let bullets = []
let Banana = new SpriteOBJ("./Assets/Player.png","./Assets/PlayerFrontRight.png","./Assets/PlayBackLeft.png","./Assets/PlayBackRight.png")
let player = new Player(Banana);
function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    player.draw();
    player.update();
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw();
        bullets[i].update();
    }
    navKey.clear();
    requestAnimationFrame(loop)
}
function init() {
    keyboardInit();
    loop();
}
init();