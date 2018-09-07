var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var start = document.getElementById("start")
var sound = document.getElementById("audio")
sound.src="./audio/intro.mp3"
sound.volume=1
sound.autoplay=true;
sound.loop=true;
console.log(sound)

start.addEventListener("click",function(){
  sound.pause()
  var game = new Game();
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  canvas.classList="full"
  game.start();
})