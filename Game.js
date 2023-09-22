let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let currentKey = new Map();
let fullscreenElement = document.getElementById("fullscreen")
fullscreenElement.addEventListener("click", openFullscreen); 
function openFullscreen() {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) { /* Safari */
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE11 */
      canvas.msRequestFullscreen();
    }
}

