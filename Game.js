import {Rect} from "./RectUtils.js"
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let currentKey = new Map();
class Player {
    constructor() {
        this.bounds = new Rect(10,10,10,10)
    }
}
function keyboardInit() {
    window.addEventListener("keydown", function (event) {
        currentKey.set(event.key, true)
    });
    window.addEventListener("keyup", function (event) {
        currentKey.set(event.key, false);
    });
}
function loop() {

}
function init() {

}