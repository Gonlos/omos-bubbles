var CrossHair = function (player) {
  this.game = player.game
  this.player = player
  this.x = 0;
  this.y = 0;
  this.h = 30;
  this.w = 20;
  this.f=10;
  this.img = new Image()
  this.img.src = "./img/crosshair.png";
  this.angle = 0;
  this.offset = 15;
  this.position = {
    x: 0,
    y: 0
  }
  this.distance = 0;
  this.direction = { x: 0, y: 0 }
  this.img.onload = function () {
    // this.game.context.drawImage(this.img, this.game.canvas.width / 2, this.game.canvas.hight / 2, this.w,this.h);

  }
  this.mouse={x:0,y:0}
  this.start();
}
CrossHair.prototype.draw = function () {
  this.game.context.translate(this.position.x, this.position.y);
  this.game.context.rotate(Math.PI / 180 * (-this.angle - 90));
  this.game.context.translate(-this.position.x, -this.position.y);
  this.game.context.drawImage(this.img, this.position.x - this.w / 1.9, this.position.y - this.h / 3.8 + this.distance, this.w, this.h);
  this.game.context.resetTransform();
}
CrossHair.prototype.move = function () {
  this.position = { x: this.mouse.x - this.game.canvas.offsetLeft, y: this.mouse.y - this.game.canvas.offsetTop } //onmousemove document
  this.direction = { x: this.game.bubbles[0].x-this.game.x, y: this.game.bubbles[0].y-this.game.y }

  this.distance = Math.sqrt((this.position.x - this.direction.x) ** 2 + (this.position.y - this.direction.y) ** 2)
  this.distance = (this.distance >= this.game.bubbles[0].r + this.offset) ? 0 : this.game.bubbles[0].r - this.distance + this.offset;

  this.angle = (Math.atan2(-(this.position.y - this.direction.y), (this.position.x - this.direction.x)) * 180 / Math.PI) ;

}
CrossHair.prototype.fart = function (massArg) {
  console.log(this.game.bubbles[0])
  var options= {
    angle: this.angle,
    x:this.game.bubbles[0].x + (Math.log(massArg) + 5 + this.game.bubbles[0].r) * Math.cos(this.angle * Math.PI / 180),
    y:this.game.bubbles[0].y + (Math.log(massArg) + 5 + this.game.bubbles[0].r) * Math.sin(-this.angle * Math.PI / 180),
    r:Math.log(massArg),
    m:massArg
  }
  this.game.bubbles[0].boost(this.f,this.angle)
  this.game.bubbles.push(new Bubble(this.game,options))
  this.game.bubbles[this.game.bubbles.length-1].boost(-this.f,this.angle);
}
CrossHair.prototype.mouseMove=function(e){
  this.mouse=e;
}
CrossHair.prototype.start=function(){
  this.game.canvas.addEventListener("mousemove",function(e){
    e.preventDefault()
    this.mouse=e
  }.bind(this))
  this.game.canvas.addEventListener("dblclick",function(e){
    e.preventDefault()
  })
}