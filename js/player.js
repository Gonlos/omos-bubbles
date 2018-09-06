// v= velocity, a=acceleration, f=force, m=mass,r=radius
var Player = function (game,id) {
  Bubble.call(this,game,id)
  this.game=game
  this.x = this.game.center.x;
  this.y = this.game.center.y;
  this.r = 2000;
  this.m = this.r;
  this.r=Math.log(this.m)*2
  this.vx = 0;
  this.vy = 0;
  this.a = 0;
  this.angle = 0;
  this.crossHair = new CrossHair(this);
  this.start();
}
Player.prototype=Object.create(Bubble.prototype);
Player.prototype.constructor=Player;
Player.prototype.fart = function () {
  volume=Math.floor(this.m*0.01)
  if(volume<10){
    volume=10
  }
  this.crossHair.fart(volume);
  this.m-=volume
}
Player.prototype.start=function(){
  this.game.canvas.addEventListener("click",function(e){
    this.fart()
  }.bind(this))
}
