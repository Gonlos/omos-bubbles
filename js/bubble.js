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
  this.r=Math.log(this.m)*2
  this.angle = options.angle || 0;
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.a = 0;
  this.friction = 0.01;
  this.img=new Image();
  this.img.src="./img/bubble.png"
};
Bubble.prototype.move = function() {
  this.r=Math.log(this.m)*4
  var a;
  this.a -= this.a*this.friction;
  this.vx -= this.vx*this.friction/2;
  this.vy -= this.vy*this.friction/2;
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
  var x=this.x-this.game.x
  var y=this.y-this.game.y
  context.moveTo(x,y);
  try{context.drawImage(this.img, x-this.r-2, y-this.r-2,this.r*2+4, this.r*2+4);}
  catch(e){}
  
  context.strokeStyle = this.proportionalColor()+"66";
  context.fillStyle = this.proportionalColor()+"22";
  
  context.beginPath();
  context.globalCompositeOperation="lighter"
  context.shadowColor=this.proportionalColor();
  
  context.shadowBlur=15;
  context.arc(x, y, this.r, 0, Math.PI * 180, true);
  context.fill();
  context.arc(x, y, this.r+1, 0, Math.PI * 180, true);
  context.stroke();
  context.shadowBlur=0
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
Bubble.prototype.collisionBoost=function(bubble){
  //m*a=m*a
  var a1=Trig.getXY(this.a,this.angle)
  var a2=Trig.getXY(bubble.a,bubble.angle)
  var fx1=a1.x*this.m
  var fy1=a1.y*this.m
  var fx2=a2.x*bubble.m
  var fy2=a2.y*bubble.m
  //a1=(f1-f2)/m1 a2=(f2-f1)/m2
  a1.x=(fx1+fx2)/this.m
  a1.y=(fy1+fy2)/this.m
  a2.x=(fx2-fx1)/bubble.m
  a2.y=(fy2-fy1)/bubble.m
  a1=Trig.getVector(a1.x,a1.y)
  a2=Trig.getVector(a2.x,a2.y)
  this.a=a1.module/2
  this.angle=a1.angle
  bubble.a=a2.module/2
  bubble.angle=a2.angle

}
Bubble.prototype.absorb=function(bubble,distance){
  absorcion= (distance-bubble.r-this.r)*4
  // console.log("absorcion",absorcion,bubble.r)
  var f=this.m*this.a
  if(absorcion<0){
    this.m-=absorcion
    bubble.m+=absorcion
  }
  if(bubble.m<0){
    bubble.r=0
    bubble.m=0
  }
  this.a=f/(this.m*10)
}
Bubble.prototype.proportionalColor=function(){
  //>to red <togreen =blue
  var r=g=b="FF";
  var playerSize=0
  if(this.game.bubbles[0].__proto__.constructor.name=="Player"){
    playerSize=this.game.bubbles[0].m
  }

  
  if(this.m<playerSize){
    r="00"
    g=Math.floor(((-125/playerSize)*this.m)+255)
    g=(g<10)?"0"+g.toString(16):g.toString(16)
    b="00"
  }
  if(this.m>playerSize){
    r=Math.floor((80/(this.game.totalSize-playerSize)*this.m)+175)
    r=(r<10)?"0"+r.toString(16):r.toString(16)
    g="00"
    b="00"
  }
  return "#"+r+g+b;
}