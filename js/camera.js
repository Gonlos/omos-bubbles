var Camera =function(game){
  this.game=game;
  this.canvasCam = document.getElementById("game");
  this.canvasCam.width=400
  this.canvasCam.height=200
  this.contextCam = this.canvasCam.getContext("2d");
  // this.canvasCam.width=window.innerWidth;
  // this.canvasCam.height=window.innerHeight;
  this.x = this.game.canvas.width/2 - this.canvasCam.width/2;
  this.y = this.game.canvas.height/2 - this.canvasCam.height/2;
 
}
Camera.prototype.move=function(){

}
Camera.prototype.draw=function(){
    // this.contextCam.clearRect(20, 20, this.canvasCam.width, this.canvasCam.height);
    this.contextCam.drawImage(this.game.canvas,this.x, this.y,this.canvasCam.width, this.canvasCam.height)
  // this.contextCam.drawImage(this.game.canvas,this.x, this.y,this.canvasCam.width, this.canvasCam.height,0,0, this.canvasCam.width, this.canvasCam.height);
  
}