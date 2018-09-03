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
  this.friction = 0.981;
};
Bubble.prototype.move = function() {
  this.vx *= this.friction;
  this.vy *= this.friction;
  this.a *= this.friction;
  ax = this.a * Math.cos((this.angle * Math.PI) / 180);
  ay = this.a * Math.sin((-this.angle * Math.PI) / 180);
  //vx=v*cos(ang*pi/180) vy=v*sin(ang*pi/180)
  if (this.x + this.r > this.game.canvas.width || this.x - this.r < 0) {
    this.vx *= -1;
    ax *= -0.5;
  }
  if (this.y - this.r < 0 || this.y + this.r > this.game.canvas.height) {
    this.vy *= -1;
    ay *= -0.5;
  }
  this.vx += ax;
  this.vy += ay;
  this.x += this.vx; //* Math.cos(this.angle * Math.PI / 180);
  this.y += this.vy; //* Math.sin(-this.angle * Math.PI / 180);
  this.a = Math.sqrt(ax ** 2 + ay ** 2);
  this.angle = (Math.atan2(-ay, ax) * 180) / Math.PI;
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
