import { Rect } from "./RectUtils.js";
import { ParticleSource } from "./Particals.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentKey = new Map();
let navKey = new Map();
let mode = "menu";
let SinglePlay = document.getElementById("singleplay");
let MultiPlay = document.getElementById("multiPlay");

let funcRUN = false;
let funcRUN2 = false;

class SpriteOBJ {
  constructor(LeftSrc, RightSrc, BackLeft, BackRight) {
    this.imageLeft = new Image();
    this.imageLeft.src = "./Assets/" + LeftSrc;
    this.imageRight = new Image();
    this.imageRight.src = "./Assets/" + RightSrc;

    this.imageBackLeft = new Image();
    this.imageBackLeft.src = "./Assets/" + BackLeft;
    this.imageBackRight = new Image();
    this.imageBackRight.src = "./Assets/" + BackRight;
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
    console.log(this.num);
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
let playerHealth = 4;
let playerHealth2 = 4;

class Player {
  constructor(SpriteOBJ, type) {
    this.addjusterX = 0;
    this.addjusterY = 0;
    this.original = SpriteOBJ;
    this.sprite = SpriteOBJ;
    this.bounds = new Rect(10, 10, 100, 100);
    this.speed = 2;
    this.direction = "left";
    this.prevDirection = "left";
    this.type = type;
    this.heart = new Image();
    this.heart.src = "./Assets/BananaHeart.png";
  }
  removeHealth(num) {
    if (funcRUN === false) {
      funcRUN = true;
      setTimeout(() => {
        playerHealth -= num;
        funcRUN = false;
      }, 200);
    }
  }
  removeHealth2(num) {
    if (funcRUN2 === false) {
      funcRUN2 = true;
      setTimeout(() => {
        playerHealth2 -= num;
        funcRUN2 = false;
      }, 200);
    }
  }
  draw() {
    ctx.imageSmoothingEnabled = false;
    if (this.type === "Player1") {
      if (playerHealth <= 0) {
        playerHealth = 0;
        alert("Player 1 Died");
        location.reload();
      }
      for (let i = 0; i < playerHealth; i++) {
        ctx.drawImage(this.heart, 5 + i * 55, 10, 55, 55);
      }
      for (let b = 0; b < bullets.length; b++) {
        if (
          this.bounds.intersects(bullets[b].bounds) ||
          bullets[b].bounds.intersects(this.bounds)
        ) {
          this.removeHealth(1);
          bullets[b].visible = false;
        }
      }
    }
    if (this.type === "Player2") {
      if (playerHealth2 <= 0) {
        playerHealth2 = 0;
        alert("Player 2 Died");
        location.reload();
      }
      console.log(playerHealth2);
      for (let i = 0; i < playerHealth2; i++) {
        ctx.drawImage(this.heart, 1400 + i * 55, 10, 55, 55);
      }
      for (let b = 0; b < bullets.length; b++) {
        if (
          this.bounds.intersects(bullets[b].bounds) ||
          bullets[b].bounds.intersects(this.bounds)
        ) {
          this.removeHealth2(1);
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
      if (currentKey.get("w") || currentKey.get("w")) {
        this.bounds.y -= this.speed;
        this.addjusterX = 30;
        this.addjusterY = -50;
        this.direction = "up";
      }
      if (currentKey.get("s") || currentKey.get("s")) {
        this.addjusterX = 30;
        this.addjusterY = 100;
        this.bounds.y += this.speed;
        this.direction = "down";
      }
      if (currentKey.get("a") || currentKey.get("a")) {
        this.addjusterX = -40;
        this.addjusterY = 18;
        this.bounds.x -= this.speed;
        if (this.direction === "left" || this.direction === "right") {
          this.prevDirection = this.direction;
        }
        this.direction = "left";
      }
      if (currentKey.get("d") || currentKey.get("d")) {
        this.addjusterX = 100;
        this.addjusterY = 18;
        this.bounds.x += this.speed;
        if (this.direction === "left" || this.direction === "right") {
          this.prevDirection = this.direction;
        }
        this.direction = "right";
      }
      if (navKey.get(" ")) {
        bullets.push(new Bullet(this, this.direction, ""));
      }
    }
    if (this.type == "Ai") {
      if (this.bounds.x < player.bounds.x) {
        this.bounds.x += 1;
        this.direction = "right";
      }
      if (this.bounds.x > player.bounds.x) {
        this.bounds.x -= 1;
        this.direction = "left";
      }
      if (this.bounds.y < player.bounds.y) {
        this.bounds.y += 1;
        this.direction = "down";
      }
      if (this.bounds.y > player.bounds.y) {
        this.bounds.y -= 1;
        this.direction = "up";
      }
      if (Math.floor(Math.random() * 100) === 13) {
        bullets.push(new Bullet(this, this.direction, 2));
      }
    }
    if (this.type == "Player2") {
      if (currentKey.get("ArrowUp") || currentKey.get("ArrowUp")) {
        this.bounds.y -= this.speed;
        this.direction = "up";
        this.addjusterX = 30;
        this.addjusterY = -50;
        this.direction = "up";
      }
      if (currentKey.get("ArrowDown") || currentKey.get("ArrowDown")) {
        this.bounds.y += this.speed;
        this.direction = "down";
        this.addjusterX = 30;
        this.addjusterY = 100;
      }
      if (currentKey.get("ArrowLeft") || currentKey.get("ArrowLeft")) {
        this.bounds.x -= this.speed;
        if (this.direction === "left" || this.direction === "right") {
          this.prevDirection = this.direction;
        }
        this.direction = "left";
        this.addjusterX = -40;
        this.addjusterY = 18;
      }
      if (currentKey.get("ArrowRight") || currentKey.get("ArrowRight")) {
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
let guakman = new SpriteOBJ(
  "AvacadoManLeft.png",
  "AvacadoMan.png",
  "AvacadoManBackLeft.png",
  "AvacadoManBackRight.png"
);
let hotSauce = new SpriteOBJ(
  "HotSauceManLeft.png",
  "HotSauceManRight.png",
  "HotSauceManBackLeft.png",
  "HotSauceManBackRight.png"
);
let Banana = new SpriteOBJ(
  "Player.png",
  "PlayerRight.png",
  "PlayBackLeft.png",
  "PlayBackRight.png"
);

let Ai = new Player(hotSauce, "Ai");
Ai.bounds.x = 500;
let player = new Player(Banana, "Player1");
let player2 = new Player(guakman, "Player2");
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
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (mode == "menu") {
    // enter menu code
  }
  if (mode === "multiplayer") {
    canvas.style.visibility = "visible";
    pushplayer(player,player2)
    console.log(AllPlayers)
    document.getElementById("menu-container").style.visibility = "hidden";
    for (let i = 0; i < AllPlayers.length; i++) {
      AllPlayers[i].draw();
      AllPlayers[i].update();
    }
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].draw();
      bullets[i].update();
    }
    navKey.clear();
  }
  if (mode === "singleplay") {
    canvas.style.visibility = "visible";
    pushplayer(player)
    console.log(AllPlayers)
    document.getElementById("menu-container").style.visibility = "hidden";
    for (let i = 0; i < AllPlayers.length; i++) {
      AllPlayers[i].draw();
      AllPlayers[i].update();
    }
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].draw();
      bullets[i].update();
    }
    navKey.clear();
  }
  requestAnimationFrame(loop);
}

function init() {
  SinglePlay.addEventListener("click", function () {
    mode = "singleplay";
  });
  MultiPlay.addEventListener("click", function () {
    mode = "multiplayer";
  });
  keyboardInit();
  loop();
}
init();
