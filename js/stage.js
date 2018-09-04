var Stage=function(game){
  this.game=game
  this.startStage()
}
Stage.prototype.startStage=function(){
  enemies=[]
  for (var i = 0; i < this.game.w; i++) {
    for (var j= 0;j < this.game.h;j++)
    {
      
      if(Math.floor(Math.random()*1000)<1){
        mRandom=Math.floor(Math.random()*2000+50)
        this.game.bubbles.push(new Bubble(this.game,{r:mRandom,x:i,y:j}))
      }

    }
  }
  console.log(this.game.bubbles)
}