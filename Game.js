import { Rect } from "./RectUtils.js";
import { ParticleSource } from "./Particals.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentKey = new Map();
let navKey = new Map();
let mode = "menu";
let SinglePlay = document.getElementById("singleplay");
let MultiPlay = document.getElementById("multiPlay");
window.addEventListener("gamepadconnected", (e) => {
  const gamepad = e.gamepad;
  console.log(`Gamepad connected: ${gamepad.id}`);
  console.log(gamepad)
});
function pollGamepad() {
  const gamepads = navigator.getGamepads();
  const gamepad = gamepads[0]; // Access the first gamepad

  if (gamepad) {
    // console.log("qwokriubg")
      // Access button states
      const buttonB = gamepad.buttons[0].pressed; // Check if button B is pressed
      // console.log(buttonB)
      buttonA = gamepad.buttons[1].pressed; // Check if button A is pressed
      // console.log(buttonA)

      buttonUp = gamepad.buttons[12].pressed; // Check if button Left is pressed
      buttonLeft = gamepad.buttons[14].pressed; // Check if button Left is pressed
      buttonRight = gamepad.buttons[15].pressed; // Check if button Left is pressed
      buttonDown = gamepad.buttons[13].pressed; // Check if button Left is pressed
  }
}
let buttonUp = null
let buttonLeft = null
let buttonRight = null
let buttonDown = null
let buttonA = null

const gameover = document.getElementById("#gameover-container");

let Shake = false;
class MapOBJ {
  constructor(src) {
    this.map = new Image();
    this.map.src = src
    this.objects = []
  }
}
class Level {
  constructor(map) {
    this.image = map.map
    this.bounds = new Rect(135,75,320*4,160*4)
  }
  draw() {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(this.image,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
  }
}
class SpriteOBJ {
  constructor(LeftSrc, RightSrc, BackLeft, BackRight,heart) {
    this.imageLeft = new Image();
    this.imageLeft.src = "./Assets/" + LeftSrc;
    this.imageRight = new Image();
    this.imageRight.src = "./Assets/" + RightSrc;

    this.imageBackLeft = new Image();
    this.imageBackLeft.src = "./Assets/" + BackLeft;
    this.imageBackRight = new Image();
    this.imageBackRight.src = "./Assets/" + BackRight;
    
    this.imageHeart = new Image();
    this.imageHeart.src = "./Assets/" + heart;
  }
}
class Bullet {
  constructor(player, direction, num) {
    this.num = num;
    this.bounds = new Rect(
      player.bounds.x + player.addjusterX,
      player.bounds.y + player.addjusterY,
      40,
      40
    );
    this.speed = 4;
    this.visible = true;
    this.direction = direction;
    this.image = new Image();
    this.image.src = "./Assets/Bullet.png";
    this.addjuster = 0;
  }
  update() {
    if (this.visible) {
      if (this.direction == "up") {
        this.bounds.y -= this.speed;
      }
      if (this.direction == "down") {
        this.bounds.y += this.speed;
      }
      if (this.direction == "left") {
        this.bounds.x -= this.speed;
      }
      if (this.direction == "right") {
        this.bounds.x += this.speed;
      }
    }
  }
  draw() {
    if (this.visible) {
      ctx.strokeStyle = "red"
      ctx.strokeRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
      ctx.drawImage(
        this.image,
        this.bounds.x,
        this.bounds.y,
        this.bounds.w,
        this.bounds.h
      );
    }
  }
}
class Player {
  constructor(SpriteOBJ, type,x,y) {
    this.addjusterX = 0;
    this.addjusterY = 0;
    this.original = SpriteOBJ;
    this.sprite = SpriteOBJ;
    this.bounds = new Rect(x, y, 100, 100);
    this.speed = 2.25;
    this.direction = "left";
    this.prevDirection = "left";
    this.type = type;
    this.health = 4;
  }
  draw() {
    ctx.imageSmoothingEnabled = false;
    for (let b = 0; b < bullets.length; b++) {
      if (
        this.bounds.intersects(bullets[b].bounds) ||
        bullets[b].bounds.intersects(this.bounds)
      ) {
          if (bullets[b].visible) {
            bullets[b].visible = false;
            bullets[b].bounds.y = -3000;
            this.health -= 1;
          }
      }
    }
    if (this.type === "Player1") {
      if (this.health <= 0) {
        this.health = 0;
        // alert("Player 1 Died");
      }
      for (let p = 1; p < AllPlayers.length; p++) {
        for (let i = 0; i < this.health; i++) {
          ctx.drawImage(this.sprite.imageHeart, (p*250) + i * 55, 10, 55, 55);
        }
      }
    }
    if (this.type === "Player2") {
      if (this.health <= 0) {
        this.health = 0;
        // alert("Player 2 Died");
      }
      for (let p = 1; p < AllPlayers.length; p++) {
        for (let i = 0; i < this.health; i++) {
          ctx.drawImage(this.sprite.imageHeart, (p*250) + i * 55, 10, 55, 55);
        }
      }
      for (let b = 0; b < bullets.length; b++) {
        if (
          this.bounds.intersects(bullets[b].bounds) ||
          bullets[b].bounds.intersects(this.bounds)
        ) {
          bullets[b].visible = false;
        }
      }
    }
    if (this.direction == "up") {
      if (this.prevDirection == "left") {
        ctx.drawImage(
          this.sprite.imageBackLeft,
          this.bounds.x,
          this.bounds.y,
          this.bounds.w,
          this.bounds.h
        );
      }
      if (this.prevDirection == "right") {
        ctx.drawImage(
          this.sprite.imageBackRight,
          this.bounds.x,
          this.bounds.y,
          this.bounds.w,
          this.bounds.h
        );
      }
    }
    if (this.direction == "left") {
      ctx.drawImage(
        this.sprite.imageLeft,
        this.bounds.x,
        this.bounds.y,
        this.bounds.w,
        this.bounds.h
      );
    }
    if (this.direction == "right" || this.direction == "down") {
      ctx.drawImage(
        this.sprite.imageRight,
        this.bounds.x,
        this.bounds.y,
        this.bounds.w,
        this.bounds.h
      );
    }
  }
  update() {
    if (this.type === "Player1") {
      console.log(buttonUp)
      if (currentKey.get("w") || currentKey.get("w") || buttonUp) {
        this.bounds.y -= this.speed;
        this.addjusterX = 30;
        this.addjusterY = -50;
        this.direction = "up";
      }
      if (currentKey.get("s") || currentKey.get("s") || buttonDown) {
        this.addjusterX = 30;
        this.addjusterY = 100;
        this.bounds.y += this.speed;
        this.direction = "down";
      }
      if (currentKey.get("a") || currentKey.get("a") || buttonLeft) {
        this.addjusterX = -40;
        this.addjusterY = 18;
        this.bounds.x -= this.speed;
        if (this.direction === "left" || this.direction === "right") {
          this.prevDirection = this.direction;
        }
        this.direction = "left";
      }
      if (currentKey.get("d") || currentKey.get("d") || buttonRight) {
        this.addjusterX = 100;
        this.addjusterY = 18;
        this.bounds.x += this.speed;
        if (this.direction === "left" || this.direction === "right") {
          this.prevDirection = this.direction;
        }
        this.direction = "right";
      }
      if (navKey.get(" ") || buttonA) {
        bullets.push(new Bullet(this, this.direction, ""))
      }
    }
    if (this.type == "Ai") {
      for (let p = 0; p < AllPlayers.length; p++) {
        for (let i = 0; i < this.health; i++) {
          ctx.drawImage(this.sprite.imageHeart, (p*250) + i * 55, 10, 55, 55);
        }
      }
      if (this.bounds.x < player.bounds.x) {
        this.addjusterX = 125;
        this.addjusterY = 18;
        this.bounds.x += 1;
        this.direction = "right";
      }
      if (this.bounds.x > player.bounds.x) {
        this.bounds.x -= 1;
        this.addjusterX = -80;
        this.addjusterY = 18;
        this.direction = "left";
      }
      if (this.bounds.y < player.bounds.y) {
        this.bounds.y += 1;
        this.addjusterX = 30;
        this.addjusterY = 125;
        this.direction = "down";
      }
      if (this.bounds.y > player.bounds.y) {
        this.bounds.y -= 1;
        this.addjusterX = 30;
        this.addjusterY = -90;
        this.direction = "up";
      }
      if (Math.floor(Math.random() * 100) === 13) {
        bullets.push(new Bullet(this, this.direction, 2));

      }
      for (let b = 0; b < bullets.length; b++) {
        if (
          this.bounds.intersects(bullets[b].bounds) ||
          bullets[b].bounds.intersects(this.bounds)
        ) {
          bullets[b].visible = false;
        }
      }
    }
    if (this.type == "Player2") {
      if (currentKey.get("ArrowUp")) {
        this.bounds.y -= this.speed;
        this.direction = "up";
        this.addjusterX = 30;
        this.addjusterY = -50;
        this.direction = "up";
      }
      if (currentKey.get("ArrowDown")) {
        this.bounds.y += this.speed;
        this.direction = "down";
        this.addjusterX = 30;
        this.addjusterY = 100;
      }
      if (currentKey.get("ArrowLeft")) {
        this.bounds.x -= this.speed;
        if (this.direction === "left" || this.direction === "right") {
          this.prevDirection = this.direction;
        }
        this.direction = "left";
        this.addjusterX = -40;
        this.addjusterY = 18;
      }
      if (currentKey.get("ArrowRight")) {
        this.bounds.x += this.speed;
        this.addjusterX = 100;
        this.addjusterY = 18;
        if (this.direction === "left" || this.direction === "right") {
          this.prevDirection = this.direction;
        }
        this.direction = "right";
      }
      if (navKey.get("m")) {
        bullets.push(new Bullet(this, this.direction));

      }
    }
  }
  reset() {
    this.sprite = this.original;
    this.bounds = new Rect(10, 10, 64, 64);
    this.speed = 2;
    this.direction = "left";
    this.prevDirection = "left";
  }
}
class PowerUp {
  constructor(x, y, type){
    this.image = new Image();
    this.type = type;
    this.image.src = "./Assets/PowerUps/" + this.type + ".png"
    this.bounds = new Rect(x, y, 50 * 1, 50 * 1);
  }
  draw(){
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.image, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
  }
  update(){
    AllPlayers.forEach((playah) => {
      if (
        this.bounds.intersects(playah.bounds) ||
        playah.bounds.intersects(this.bounds)
      ) {
          this.bounds.y = -3000;
          if (this.type = "potassium") {
            playah.speed++;
          }
          if (this.type = "healpeal") {
            playah.health++;
          }
      }
    });
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
let bullets = [];
let powerups = [];
let bananaWorld = new MapOBJ("./Assets/Map.png");
let world = new Level(bananaWorld);
let guakman = new SpriteOBJ(
  "AvacadoManLeft.png",
  "AvacadoMan.png",
  "AvacadoManBackLeft.png",
  "AvacadoManBackRight.png",
  "BananaHeart.png"

);
let hotSauce = new SpriteOBJ(
  "HotSauceManLeft.png",
  "HotSauceManRight.png",
  "HotSauceManBackLeft.png",
  "HotSauceManBackRight.png",
  "HotSauceManHearts.png"
);
let Banana = new SpriteOBJ(
  "Player.png",
  "PlayerRight.png",
  "PlayBackLeft.png",
  "PlayBackRight.png",
  "BananaHeart.png"
);
let Ai = new Player(hotSauce, "Ai",250,20);
Ai.bounds.x = 500;
let player = new Player(Banana, "Player1",100,100);
let player2 = new Player(guakman, "Player2",500,500);
let AllPlayers = [Ai];
let hasplayer = false;
function pushplayer(n,b) {
  for (let i = 0; i < AllPlayers.length; i++) {
    if (AllPlayers[i] === n || AllPlayers[i] === b) {
      hasplayer = true;
    } else {
      if (hasplayer === false) {
        AllPlayers.push(n)
        if (b != undefined) {
          AllPlayers.push(b)
        }
        hasplayer = true;
      }
    }
  }
}
function addPowerUp(x, y, type) {
  const newPowerUp = new PowerUp(x, y, type);
  powerups.push(newPowerUp);
}
function postShake() {
  ctx.restore();
}
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  pollGamepad();
  if (Shake) {
    var dx = Math.random()*15;
    var dy = Math.random()*15;
    ctx.translate(dx, dy);
}
  if (mode == "menu") {
    // enter menu code
  }
  if (mode === "multiplayer") {
    canvas.style.visibility = "visible";
    pushplayer(player,player2)
    document.getElementById("menu-container").style.visibility = "hidden";
    for (let i = 0; i < AllPlayers.length; i++) {
      AllPlayers[i].draw();
      AllPlayers[i].update();
    }
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].draw();
      bullets[i].update();
    }
    for (let i = 0; i < powerups.length; i++) {
      powerups[i].draw();
      powerups[i].update();
    }
    navKey.clear();
  }
  if (mode === "singleplay") {
    ctx.save();
    canvas.style.visibility = "visible";
    pushplayer(player)
    world.draw();
    document.getElementById("menu-container").style.visibility = "hidden";
    for (let i = 0; i < AllPlayers.length; i++) {
      AllPlayers[i].draw();
      AllPlayers[i].update();
    }
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].draw();
      bullets[i].update();
    }
    for (let i = 0; i < powerups.length; i++) {
      powerups[i].draw();
      powerups[i].update();
    }
    navKey.clear();
    ctx.restore();
  }
  postShake();
  requestAnimationFrame(loop);
}

function init() {
  SinglePlay.addEventListener("click", function () {
    mode = "singleplay";
  });
  MultiPlay.addEventListener("click", function () {
    mode = "multiplayer";
  });
  addPowerUp(500, 500, "potassium");
  keyboardInit();
  loop();
}
init();
