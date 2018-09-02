var CrossHair = function (game) {
  this.game = game
  this.x = 0;
  this.y = 0;
  this.h = 30;
  this.w = 20;
  this.angle = 0;
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
}
CrossHair.prototype.draw = function () {
  this.game.context.translate(this.position.x, this.position.y);
  this.game.context.rotate(Math.PI / 180 * (-this.angle));
  this.game.context.translate(-this.position.x, -this.position.y);
  this.game.context.drawImage(this.img, this.position.x - this.w / 1.9, this.position.y - this.h / 3.8 + this.distance, this.w, this.h);
  this.game.context.resetTransform();

  // this.game.context.beginPath();
  // this.game.context.moveTo(this.direction.x, this.direction.y);
  // this.game.context.lineTo(this.position.x, this.position.y);
  // this.game.context.strokeStyle='white';
  // this.game.context.stroke();

}
CrossHair.prototype.move = function (e) {
  this.position = { x: e.x - this.game.canvas.offsetLeft, y: e.y - this.game.canvas.offsetTop } //onmousemove document
  this.direction = { x: this.game.center.x, y: this.game.center.y }
  
  this.distance = Math.sqrt((this.position.x - this.direction.x)** 2+ (this.position.y - this.direction.y)**2)
  this.distance = (this.distance >= this.game.player.weight+this.offset) ? 0 : this.game.player.weight-this.distance+this.offset;
  
  this.angle = (Math.atan2(-(this.position.y - this.direction.y), (this.position.x - this.direction.x)) * 180 / Math.PI) + 90;

}