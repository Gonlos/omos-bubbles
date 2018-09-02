var Player=function(game){
  this.game=game,
  this.x=this.game.center.x;
  this.y=this.game.center.y;
  this.weight=30;
  this.crossHair = new CrossHair(game);
}
Player.prototype.fart=function(){

  console.log("pedo")
}
Player.prototype.move=function(){

}
Player.prototype.draw=function(){
  this.crossHair.draw();
  context.fillStyle='white';
  context.arc(this.x, this.y, this.weight, 0, Math.PI*180,true);
  context.fill();
  
  
  
}