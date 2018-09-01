var Game = function () {
  this.canvas = document.getElementById("game");
  this.context = canvas.getContext("2d");
  this.zoom = 1;
  this.w = this.canvas.width * this.zoom;
  this.h = this.canvas.height * this.zoom;
  this.offsetX = this.w - this.canvas.width;
  this.offsetY = this.h - this.canvas.height;
  this.center = {
    x: this.canvas.width / 2 + this.offsetX,
    y: this.canvas.height / 2 + this.offsetY
  }
  this.intervalID = 0;
  this.time=0;
  this.reset();
}
Game.prototype.move = function () {

}
Game.prototype.start = function () {
  this.time=new Date();
  this.intervalID = setInterval(function () {
    var now=new Date();
    if(now.getTime()-this.time.getTime()>10000){
      this.stop()
    }
    this.clear();
    this.moveAll();
    this.drawAll();
  }.bind(this),1000)
}
Game.prototype.reset = function () {
  this.enemies = [];
  this.crossHair = new CrossHair(this);
  // this.player=new Player(this)
}
Game.prototype.clear = function () {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
Game.prototype.moveAll = function () {
  this.move();
  // this.crossHair.move();
  // this.player.move();
}
Game.prototype.drawAll = function () {
  this.draw();
  this.crossHair.draw();
  // this.player.draw;
}
Game.prototype.draw = function () {
  console.log("aaaa")
  context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  context.fill();
  
}
Game.prototype.stop=function(){
  clearInterval(this.intervalID)
}