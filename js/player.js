// v= velocity, a=acceleration, f=force, m=mass,r=radius
var Player = function (game) {
  Bubble.call(this,game)
  this.game=game
  this.x = this.game.center.x;
  this.y = this.game.center.y;
  this.r = 30;
  this.m = this.r;
  this.vx = 10;
  this.vy = 5;
  this.a = 0;
  this.angle = 0;
  //solo player
  this.crossHair = new CrossHair(game);
}
Player.prototype=Object.create(Bubble.prototype);
Player.prototype.constructor=Player;
//solo player
Player.prototype.fart = function () {
  this.crossHair.fart(this.m*0.05);
  this.m*=.95
}
Player.prototype.getXY = function (unit, angle) {
  return {
    x:unit * Math.cos(angle * Math.PI / 180),
    y:unit * Math.sin(-angle * Math.PI / 180),
  }
}
Player.prototype.getVector = function (unitX, unitY) {
  return {
    angle: Math.atan2(-unitY, unitX) * 180 / Math.PI,
    module: Math.sqrt(unitX ** 2 + unitY ** 2)
  }
}