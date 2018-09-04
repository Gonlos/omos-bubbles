// m=mass,r=radius,
var Bubble = function(game, options) {
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
  this.vx = 0;
  this.vy = options.vx || 0;
  this.r = options.r || 5;
  this.m = this.r;
  // r = log(m)
  this.r=Math.log(this.m)+1
  this.angle = options.angle || 0;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.a = 0;
  this.friction = 0.989;
};
Bubble.prototype.move = function() {
  this.r=Math.log(this.m)+1
  var a;
  this.a *= this.friction;
  this.vx *= this.friction;
  this.vy *= this.friction;
  a=Trig.getXY(this.a,this.angle)
  if (this.x + this.r > this.game.w || this.x - this.r < 0) {
    this.vx *= -1;
    a.x *= -0.5;
  }
  if (this.y - this.r < 0 || this.y + this.r > this.game.h) {
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
Bubble.prototype.absorb=function(bubble,distance){
  absorcion= (distance-bubble.r-this.r)
  console.log("absorcion",absorcion,bubble.r)
  if(absorcion<0){
    this.m-=absorcion
    bubble.m+=absorcion
  }
  if(bubble.m<0){
    bubble.r=0
    bubble.m=0
    return bubble.id
  }
  return false
  
}
