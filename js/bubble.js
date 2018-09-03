// m=mass,r=radius,
var Bubble = function (game, id, options) {
  options=(options)?options:{}
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
    // console.log(options)
  this.game = game;
  this.id = id;
  this.vx = 0;
  this.vy = options.vx || 0;
  this.r = options.r || 5;
  this.m = this.r
  this.angle = options.angle || 0;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.a = 0;
  this.friction = .979
  // console.log(this.y,this.x)
}
Bubble.prototype.move = function () {
  console.log(this.r,this.m)
  this.vx *= this.friction
  this.vy *= this.friction
  this.a *= this.friction
  ax = this.a * Math.cos(this.angle * Math.PI / 180);
  ay = this.a * Math.sin(-this.angle * Math.PI / 180);
  // console.log(this.a, ax, ay, this.angle)
  //vx=v*cos(ang*pi/180) vy=v*sin(ang*pi/180)
  // console.log(this.y,this.v,this.a)
  if (this.x + this.r > this.game.canvas.width || this.x - this.r < 0) {
    this.vx *= -1;
    ax *= -.5
    // console.log("rebote")
  }
  if (this.y - this.r < 0 || this.y + this.r > this.game.canvas.height) {
    this.vy *= -1
    ay *= -.5
    // console.log("rebote")
  }
  this.vx += ax
  this.vy += ay
  // console.log(this.x,this.y,this.vx,this.vy)
  this.x += this.vx //* Math.cos(this.angle * Math.PI / 180);
  this.y += this.vy //* Math.sin(-this.angle * Math.PI / 180);
  this.a = Math.sqrt(ax ** 2 + ay ** 2)
  this.angle = Math.atan2(-ay, ax) * 180 / Math.PI
  // console.log(this.a, ax, ay, this.angle)
} 
Bubble.prototype.draw = function () {
  context.fillStyle = 'white';
  context.moveTo(this.x, this.y);
  context.beginPath();
  context.arc(this.x, this.y, this.r, 0, Math.PI * 180, true);
  context.closePath();
  context.stroke();
}
Bubble.prototype.pushBubble = function (f, angleArg) {
  //F=m*a => a=F/m    -90
  //fuerza que lleva el player
  console.log(this.a, this.angle, f, angleArg)
  fpx = this.m * this.a * Math.cos(this.angle * Math.PI / 180)
  fpy = this.m * this.a * Math.sin(-this.angle * Math.PI / 180);
  fx = f * Math.cos(angleArg * Math.PI / 180)
  fy = f * Math.sin(-angleArg * Math.PI / 180)
  this.a = Math.sqrt(((fpx - fx) ** 2 + (fpy - fy) ** 2)) / this.m
  this.angle = Math.atan2(-(fpy - fy), (fpx - fx)) * 180 / Math.PI
  // console.log(this.a)
  // this.a = f / this.m
  // console.log(this.a, this.angle)
  //v=v+a/t
  // this.v * Math.cos(this.angle * Math.PI / 180);
  // w=m*v

}