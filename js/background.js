var Background=function(game){
  this.game=game
  this.createBackground();
}
Background.prototype.createBackground=function(){
  this.background=this.game.context.createImageData(this.game.canvas.width, this.game.canvas.height);
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
  
  context.putImageData(this.background,0,0);
  // context.strokeStyle='white';
  // context.strokeRect(10, 10, this.game.w-20, this.game.h-20);
  // context.stroke();
}
Background.prototype.move=function(){

}