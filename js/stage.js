var Stage=function(game){
  this.game=game
  this.startStage()
}
Stage.prototype.startStage=function(){
  enemies=[]
  for (var i = 30; i < this.game.canvas.width-30; i++) {
    for (var j= 30;j < this.game.canvas.height-30;j++)
    {
      if(Math.floor(Math.random()*5000)<1){
        
        if((i < this.game.canvas.width/2-30 || i > this.game.canvas.width/2+30)||(j < this.game.canvas.height/2-30 || j > this.game.canvas.height/2+30)){
          mRandom=Math.floor(Math.random()*3000+5)
          this.game.bubbles.push(new Bubble(this.game,{r:mRandom,x:i,y:j}))
        }
      }

    }
  }
  console.log(this.game.bubbles)
}