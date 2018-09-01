var CrossHair = function (game) {
  this.game = game
  this.x = 0;
  this.y = 0;
  this.h = 30;
  this.w = 20;
  this.img = "./img/crosshair.png";
  this.img.onload = function () {
    game.context.drawImage(this.img, this.game.canvas.width / 2, this.game.canvas.hight / 2, 200, 300);

  }
  this.angle = 0;
  this.offset = 0;
  this.center = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }
}
CrossHair.prototype.draw = function (e) {
  position = { x: e.offsetX , y: e.offsetY  }
  direction = { x: this.center.x, y: this.center.y }
  context.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
  angle = (Math.atan2(-(position.y - direction.y), (position.x - direction.x)) * 180 / Math.PI) + 90,
    context.translate(position.x, position.y);
  context.rotate(Math.PI / 180 * (-angle));
  context.translate(-position.x, -position.y);
  context.drawImage(cross, position.x - this.w / 1.9, position.y - this.h / 3.8 + this.offset, this.w,this.h);

  context.resetTransform();
  // context.beginPath();
  // context.moveTo(direction.x, direction.y);
  // context.lineTo(position.x, position.y);
  // context.stroke();
}