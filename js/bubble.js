// m=mass,r=radius,
var Bubble = function(game, id, options) {
  options = options ? options : {};
  /*
    options={
      r: number,
      a: number,
      angle: deg,
      x: number,
      y: number,
      m:number
    }
  */
  this.game = game;
  this.id = Math.floor(Math.random() * 10 ** 10);
  this.vx = 0;
  this.vy = options.vx || 0;
  this.r = options.r || 5;
  this.m = this.r;
  this.angle = options.angle || 0;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.a = 0;
  this.friction = 0.979;
  console.log(options.r)
};
Bubble.prototype.move = function() {
  var a;
  this.a *= this.friction;
  this.vx *= this.friction;
  this.vy *= this.friction;
  a=Trig.getXY(this.a,this.angle)
  if (this.x + this.r > this.game.canvas.width || this.x - this.r < 0) {
    this.vx *= -1;
    a.x *= -0.5;
  }
  if (this.y - this.r < 0 || this.y + this.r > this.game.canvas.height) {
    this.vy *= -1;
    a.y *= -0.5;
  }
  this.vx += a.x;
  this.vy += a.y;
  this.x += this.vx;
  this.y += this.vy;
  a = Trig.getVector(a.x,a.y);
  this.a=a.module;
  this.angle=a.angle;
};
Bubble.prototype.draw = function() {
  context.moveTo(this.x, this.y);
  context.strokeStyle = "white";
  context.beginPath();
  context.arc(this.x, this.y, this.r, 0, Math.PI * 180, true);
  context.stroke();
  context.closePath();
};
Bubble.prototype.boost = function(fArg, angleArg) {
  //F=m*a => a=F/m    -90
  var fPlayerX, fPlayerY, aPlayer;
  aPlayer = Trig.getXY(this.a, this.angle);
  fPlayerX = this.m * aPlayer.x;
  fPlayerY = this.m * aPlayer.y;
  fArg = Trig.getXY(fArg, angleArg);
  aPlayer = Trig.getVector(fPlayerX - fArg.x, fPlayerY - fArg.y);
  this.a = aPlayer.module / this.m;
  this.angle = aPlayer.angle;
};
