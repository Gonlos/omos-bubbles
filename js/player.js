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
  this.friction = .979;
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
Player.prototype.draw = function () {
  this.crossHair.draw();
  context.beginPath();

  // context.fillStyle='white';
  context.strokeStyle = 'white';

  context.arc(this.x, this.y, this.r, 0, Math.PI * 180, true);
  // context.fill();
  context.stroke();
  context.closePath();
}
Player.prototype.pushPlayer = function (f, angle) {
  //F=m*a => a=F/m    -90
  //fuerza que lleva el player  
  // console.log(this.a, this.angle, f, angle)
  fpx = this.m * this.a * Math.cos(this.angle * Math.PI / 180)
  fpy = this.m * this.a * Math.sin(-this.angle * Math.PI / 180);
  fx = f * Math.cos(angle * Math.PI / 180)
  fy = f * Math.sin(-angle * Math.PI / 180)
  this.a = Math.sqrt(((fpx - fx) ** 2 + (fpy - fy) ** 2)) / this.m
  this.angle = Math.atan2(-(fpy - fy), (fpx - fx)) * 180 / Math.PI
  // console.log(this.a)
  // this.a = f / this.m
  // console.log(this.a, this.angle)
  //v=v+a/t
  // this.v * Math.cos(this.angle * Math.PI / 180);
  // w=m*v

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