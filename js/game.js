var Game = function () {
  this.canvas = document.getElementById("game");
  this.context = canvas.getContext("2d");
  this.zoom = 1;
  this.canvas.width=window.innerWidth;
  this.canvas.height=window.innerHeight;
  this.w = this.canvas.width * this.zoom;
  this.h = this.canvas.height * this.zoom;
  this.offsetX = (this.w - this.canvas.width)/2;
  this.offsetY = (this.h - this.canvas.height)/2;
  this.center = {
    x: this.canvas.width / 2 + this.offsetX,  
    y: this.canvas.height / 2 + this.offsetY
  }
  this.reset();
}
Game.prototype.start = function () {
  this.time=new Date();
  this.intervalID = setInterval(function () {
    var now=new Date();
    if(now.getTime()-this.time.getTime()>30000){
      this.stop()
    }
    this.moveAll();
    this.drawAll();
  }.bind(this),1000/60)
}
Game.prototype.stop=function(){
  clearInterval(this.intervalID)
}
Game.prototype.reset = function () {
  this.bubbles = [];
  this.background=new Background(this)
  // this.player=new Player(this)
  this.bubbles.push(new Player(this))
  this.stage=new Stage(this)
}
Game.prototype.moveAll = function () {
  this.move();
  this.background.move();
  // this.player.move();
  this.moveBubbles();
  this.collisions();
}
Game.prototype.drawAll = function () {
  this.background.draw();
  this.drawBubbles();
}
Game.prototype.drawBubbles=function(){
  this.bubbles.forEach(function(bubble){
    // console.log(bubble)
    bubble.draw()
    if(bubble.__proto__.constructor.name=="Player"){
      bubble.crossHair.draw();
    }
  })
}
Game.prototype.moveBubbles=function(){
  this.bubbles.forEach(function(bubble){
    bubble.move()
    if(bubble.__proto__.constructor.name=="Player"){
      bubble.crossHair.move();
    }
  })
}
Game.prototype.collisions=function(){
  for(var i = 0;i < this.bubbles.length; i++){
    var bubble=this.bubbles[i]
    for(var j=i+1,distance;j<this.bubbles.length;j++){
      var bubble2=this.bubbles[j]
      distance=Trig.getVector(bubble.x-bubble2.x,bubble.y-bubble2.y).module
      if(distance<bubble.r+bubble2.r){
        if(bubble.r<bubble2.r){
          bubble2.absorb(bubble,distance)
        }else{
          bubble.absorb(bubble2,distance)
        }
      }
    }
  }
  this.bubbles=this.bubbles.filter(function(bubble){
      return bubble.r>0
  })
}
Game.prototype.move=function(){
  this.w = this.canvas.width * this.zoom;
  this.h = this.canvas.height * this.zoom;
  this.offsetX = (this.w - this.canvas.width)/2;
  this.offsetY = (this.h - this.canvas.height)/2;
  this.center = {
    x: this.canvas.width / 2 + this.offsetX,  
    y: this.canvas.height / 2 + this.offsetY
  }
}