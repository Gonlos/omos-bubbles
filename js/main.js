var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var game = new Game();
var start=document.getElementById("start")
// start.addEventListener("click",function(){
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  canvas.classList="full"
  game.start();
// })