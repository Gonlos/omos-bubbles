var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var cross = new Image();
cross.src = "./img/crosshair.png";
var center = {x:canvas.width/2,y:canvas.height/2}
var crossHair=new CrossHair(this)
//  
//
// cross.onload=function(){
//   context.drawImage(cross, canvas.width/2, canvas.hight/2,200,300);

// }
// console.log(canvas)
// console.log(context)
canvas.addEventListener("mousemove", function(e) {
  // console.log(canvas.width/2, canvas.height/2)
  // context.moveTo(e.offsetX, e.offsetY);
  context.clearRect(0, 0, canvas.width, canvas.height);
  crossHair.draw(e)
  // console.log(center.x/e.offsetX,center.y/e.offsetY)
  // y/x=tg angulo
  //angulo arcotg de y/x
  // console.log(Math.cos(e.offsetY-center.y)/Math.sin(e.offsetX-center.x))
  // console.log(Math.atan2(-(e.offsetY-center.y),(e.offsetX-center.x))*180/Math.PI)
  // angulo=Math.atan2(-(e.offsetY-center.y),(e.offsetX-center.x))*180/Math.PI
  // context.translate(center.x,center.y);
  // context.rotate(Math.PI / 180 * (-angulo-90));
  // context.translate(-center.x,-center.y);
  // context.drawImage(cross,center.x-10,center.y-8+20,20,30);
  
  // context.resetTransform();
  // context.beginPath();
  // context.moveTo(center.x, center.y);
  // context.lineTo(e.offsetX, e.offsetY);
  // context.stroke();
  // console.log(angulo)
  
  
  // context.rotate(Math.PI / 180 * -15);

  
  // context.drawImage(cross,e.offsetX-10, e.offsetY-10,20,30);
  // context.arc(canvas.width/2, canvas.height/2, 10, Math.PI / 180 * 0, Math.PI / 180 * 360, true);
  // context.fill();
});
