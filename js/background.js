var Background=function(game){
  this.game=game
  this.createBackground();
}
Background.prototype.createBackground=function(){
  this.background=this.game.context.createImageData(this.game.w, this.game.h);
  for (var i = 0; i < this.background.data.length; i+=4) {
    if(Math.floor(Math.random()*100)<1){
      random=Math.floor(Math.random()*155+0)
      this.background.data[i]=random
      this.background.data[i+1]=random;
      this.background.data[i+2]=random;
      this.background.data[i+3]=255;
    }else{
      this.background.data[i]=0;
      this.background.data[i+1]=0;
      this.background.data[i+2]=0;
      this.background.data[i+3]=255;
    }
  }
}
Background.prototype.draw = function () {
  var x = this.game.x + this.game.center.x;
  var y = this.game.y + this.game.center.y;
  context.putImageData(this.background,x,y,0,0,this.game.w,this.game.h);
  context.strokeStyle='white';
  context.strokeRect(x+10, y+10, this.game.w-20, this.game.h-20);
  context.beginPath();
  context.moveTo(this.game.center.x+x, y);
  context.lineTo(this.game.center.x+x, this.game.h);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.moveTo(x, this.game.center.y+y);
  context.lineTo(this.game.w, this.game.center.y+y);
  context.closePath();
  context.stroke();
  
}
Background.prototype.move=function(){

}