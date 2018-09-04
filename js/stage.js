var Stage=function(game){
  this.game=game
  this.startStage()
}
Stage.prototype.startStage=function(){
  enemies=[]
  for (var i = 0; i < this.game.w; i++) {
    for (var j= 0;j < this.game.h;j++){
      if(Math.floor(Math.random()*10000)<1){
        rRandom=Math.floor(Math.random()*20+5)
        this.game.bubbles.push(new Bubble(this.game,{r:rRandom,x:i,y:j}))
      }
    }
  }
  console.log(this.game.bubbles)
}