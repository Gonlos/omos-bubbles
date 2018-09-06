var Stage=function(game){
  this.game=game
  this.startStage()
}
Stage.prototype.startStage=function(){
  enemies=[]
  for (var i = 30; i < this.game.w-30; i++) {
    for (var j= 30;j < this.game.h-30;j++)
    {
      if(Math.floor(Math.random()*50000)<1){
        
        if((i < this.game.w/2-30 || i > this.game.w/2+30)||(j < this.game.h/2-30 || j > this.game.h/2+30)){
          mRandom=Math.floor(Math.random()*6000-500)
          this.game.bubbles.push(new Bubble(this.game,{r:mRandom,x:i,y:j}))
        }
      }

    }
  }
}
