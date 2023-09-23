Import("./RectUtils.js");
Import("./Particles.js");
Import("./Player.js");

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let currentKey = new Map();

class Player {
    constructor() {
        this.bounds = new Rect(10,10,10,10,)
    }
}

