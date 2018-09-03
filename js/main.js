var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var game = new Game();
game.start();
canvas.addEventListener("mousemove", function(e) {
  game.player.crossHair.mouseMove(e);
});
canvas.addEventListener("click",function(e){
  game.player.fart(e);
})