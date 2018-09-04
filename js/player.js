// v= velocity, a=acceleration, f=force, m=mass,r=radius
var Player = function (game,id) {
  Bubble.call(this,game,id)
  this.game=game
  this.x = this.game.center.x;
  this.y = this.game.center.y;
  this.r = 50;
  this.m = this.r;
  this.vx = 0;
  this.vy = 0;
  this.a = 0;
  this.angle = 0;
  //solo player
  this.crossHair = new CrossHair(game);
}
Player.prototype=Object.create(Bubble.prototype);
Player.prototype.constructor=Player;
//solo player
Player.prototype.fart = function () {
  volume=Math.floor(this.r*0.1)
  if(volume<1){
    volume=1
  }
  this.crossHair.fart(volume);
  this.m-=volume
  this.r-=volume
  console.log(this.m)
}
