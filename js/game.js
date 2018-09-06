var Game = function () {
  this.canvas = document.getElementById("game");
  this.context = canvas.getContext("2d");
  this.zoom = 2;
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.w = this.canvas.width * this.zoom;
  this.h = this.canvas.height * this.zoom;
  this.offsetX = (this.w - this.canvas.width) / 2;
  this.offsetY = (this.h - this.canvas.height) / 2;
  this.center = {
    x: this.canvas.width / 2 + this.offsetX,
    y: this.canvas.height / 2 + this.offsetY
  }
  this.x = 0
  this.y = 0;
  this.reset();
}
Game.prototype.start = function () {
  this.time = new Date();
  this.intervalID = setInterval(function () {
    var now = new Date();
    if (now.getTime() - this.time.getTime() > 30000) {
      this.stop()
    }
    this.moveAll();
    this.drawAll();
  }.bind(this), 1000 / 60)
}
Game.prototype.stop = function () {
  clearInterval(this.intervalID)
}
Game.prototype.reset = function () {
  this.bubbles = [];
  this.background = new Background(this)
  // this.player=new Player(this)
  this.bubbles.push(new Player(this))
  this.stage = new Stage(this)
  this.followPlayer()
}
Game.prototype.moveAll = function () {
  this.move();
  this.background.move();
  // this.player.move();
  this.moveBubbles();
  this.followPlayer();
  this.collisions();
}
Game.prototype.drawAll = function () {
  this.background.draw();
  this.drawBubbles();
}
Game.prototype.drawBubbles = function () {
  this.bubbles.forEach(function (bubble) {
    // console.log(bubble)
    bubble.draw()
    if (bubble.__proto__.constructor.name == "Player") {
      bubble.crossHair.draw();
    }
  })
}
Game.prototype.moveBubbles = function () {
  this.bubbles.forEach(function (bubble) {
    bubble.move()
    if (bubble.__proto__.constructor.name == "Player") {
      bubble.crossHair.move();
    }
  })
}
Game.prototype.collisions = function () {
  this.totalSize = 0
  for (var i = 0; i < this.bubbles.length; i++) {
    var bubble = this.bubbles[i]
    this.totalSize += bubble.m
    for (var j = i + 1, distance; j < this.bubbles.length; j++) {
      var bubble2 = this.bubbles[j]
      distance = Trig.getVector(bubble.x - bubble2.x, bubble.y - bubble2.y).module
      if (distance < bubble.r + bubble2.r) {
        if (bubble.r < bubble2.r) {
          bubble2.absorb(bubble, distance)
          bubble2.collisionBoost(bubble)
        } else {
          bubble.absorb(bubble2, distance)
          bubble.collisionBoost(bubble2)
        }
      }
    }
  }
  this.bubbles = this.bubbles.filter(function (bubble) {
    return bubble.r > 0
  })
}
Game.prototype.move = function () {
  this.w = this.canvas.width * this.zoom;
  this.h = this.canvas.height * this.zoom;
  this.offsetX = (this.w - this.canvas.width) / 2;
  this.offsetY = (this.h - this.canvas.height) / 2;
  this.center = {
    x: this.canvas.width / 2 + this.offsetX,
    y: this.canvas.height / 2 + this.offsetY
  }
}
Game.prototype.followPlayer = function () {
  this.w = this.canvas.width * this.zoom;
  this.h = this.canvas.height * this.zoom;
  if (this.bubbles[0].__proto__.constructor.name == "Player") {
    // para si this.x< -canvas.width || thix<-this.w
    // this.y< -this.h this.y< -canvas.heigth
    // this.x=(this.x<-this.w)?-this.w:this.x;
    // this.y=(this.y<-this.h)?-this.h:this.y;
    if ((this.x < -this.canvas.width-this.offsetX/(this.zoom) && this.x >= -this.w) || this.x == 0) {

      this.x = -this.bubbles[0].x - this.offsetX //(this.zoom*2) // /this.zoom-this.center.x
    }
    if ((this.y >= -this.h && this.y <= -this.canvas.height) || this.y == 0) {

      this.y = -this.bubbles[0].y - this.offsetY //(this.zoom*2) // /this.zoom-this.center.y
    }
  } else {
    this.x = 0;
    this.y = 0;

  }
  console.log(this.x, this.y, this.w, this.h, this.canvas.width, this.canvas.height)
}