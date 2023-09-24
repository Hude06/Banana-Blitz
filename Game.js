import {Rect} from "./RectUtils.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentKey = new Map();
let navKey = new Map();
let mode = "menu";
class SpriteOBJ {
    constructor(LeftSrc,RightSrc,BackLeft,BackRight) {
        this.imageLeft = new Image();
        this.imageLeft.src = "./Assets/" + LeftSrc;
        this.imageRight = new Image();
        this.imageRight.src = "./Assets/" +RightSrc;

        this.imageBackLeft = new Image();
        this.imageBackLeft.src = "./Assets/" +BackLeft;
        this.imageBackRight = new Image();
        this.imageBackRight.src = "./Assets/" +BackRight;
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
    constructor(SpriteOBJ, type) {
        this.original = SpriteOBJ
        this.sprite = SpriteOBJ
        this.bounds = new Rect(10,10,64,64)
        this.speed = 2;
        this.health = 3;
        this.direction = "left"
        this.prevDirection = "left"
        this.type = type;
        this.heart = new Image();
        this.heart.src = "./Assets/BananaHeart.png"
    }
    draw() {
        ctx.imageSmoothingEnabled = false;
        for (let i = 0; i < this.health; i++) {
            ctx.drawImage(this.heart, 10 + (i*30),10,32,32)
        }
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
        for (let i = 0; i < AllPlayers.length; i++) {
            for (let b = 0; b < bullets.length; b++) {
                if (this.bounds.intersects(bullets[b].bounds) || bullets[b].bounds.intersects(this.bounds)) {
                    this.health -= 0.01;
                }
            }
        }
        if ( this.type == "Player1" ) {
        if (currentKey.get("w") || currentKey.get("w")) {
            this.bounds.y -= this.speed
            this.direction = "up"
        }
        if (currentKey.get("s") || currentKey.get("s")) {
            this.bounds.y += this.speed
            this.direction = "down"
        }
        if (currentKey.get("a") || currentKey.get("a")) {
            this.bounds.x -= this.speed
            if (this.direction === "left" || this.direction === "right") {
                this.prevDirection = this.direction;

            }
            this.direction = "left"
        }
        if (currentKey.get("d") || currentKey.get("d")) {
            this.bounds.x += this.speed
            if (this.direction === "left" || this.direction === "right") {
                this.prevDirection = this.direction;

            }
            this.direction = "right"
        }
        if (navKey.get(" ")) {
            bullets.push (new Bullet(this,this.direction))

        }
    }
    if ( this.type == "Ai" ) {
            if (this.bounds.x < player.bounds.x ) {
                this.bounds.x += 1;
                this.direction = "right";
            }
            if (this.bounds.x > player.bounds.x ) {
                this.bounds.x -= 1;
                this.direction = "left";
            }
            if (this.bounds.y < player.bounds.y ) {
                this.bounds.y += 1;
                this.direction = "down";
            }
            if (this.bounds.y > player.bounds.y ) {
                this.bounds.y -= 1;
                this.direction = "up";
            }
            if (Math.floor(Math.random() * 100) === 13 ) {
                bullets.push (new Bullet(this,this.direction))
            }
    }
    if ( this.type == "Player2" ) {
        if (currentKey.get("ArrowUp") || currentKey.get("ArrowUp")) {
            this.bounds.y -= this.speed
            this.direction = "up"
        }
        if (currentKey.get("ArrowDown") || currentKey.get("ArrowDown")) {
            this.bounds.y += this.speed
            this.direction = "down"
        }
        if (currentKey.get("ArrowLeft") || currentKey.get("ArrowLeft")) {
            this.bounds.x -= this.speed
            if (this.direction === "left" || this.direction === "right") {
                this.prevDirection = this.direction;

            }
            this.direction = "left"
        }
        if (currentKey.get("ArrowRight") || currentKey.get("ArrowRight")) {
            this.bounds.x += this.speed
            if (this.direction === "left" || this.direction === "right") {
                this.prevDirection = this.direction;

            }
            this.direction = "right"
        }
        if (navKey.get("m")) {
            bullets.push (new Bullet(this,this.direction))

        }
    }
    }
    reset() {
        this.sprite = this.original
        this.bounds = new Rect(10,10,64,64)
        this.speed = 2;
        this.direction = "left"
        this.prevDirection = "left"
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
let guakman = new SpriteOBJ("AvacadoManLeft.png","AvacadoMan.png","AvacadoManBackLeft.png","AvacadoManBackRight.png")
let hotSauce = new SpriteOBJ("HotSauceManLeft.png","HotSauceManRight.png","HotSauceManBackLeft.png","HotSauceManBackRight.png")
let Banana = new SpriteOBJ("Player.png","PlayerRight.png","PlayBackLeft.png","PlayBackRight.png")
let Ai = new Player(hotSauce, "Ai");
let player = new Player(Banana, "Player1");
let player2 = new Player(guakman, "Player2")
let AllPlayers = [player,player2,Ai]

function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    if ( mode == "menu" ) {

    }
    if ( mode == "game" ) {
        canvas.style.visibility = "visible"
        for(let i = 0; i < AllPlayers.length; i++) {
            AllPlayers[i].draw();
            AllPlayers[i].update();
        }
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].draw();
            bullets[i].update();
        }
        navKey.clear();
    }
    requestAnimationFrame(loop)
}
function init() {
    keyboardInit();
    loop();
}
init();