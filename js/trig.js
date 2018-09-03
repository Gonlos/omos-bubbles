var Trig = {
  getXY: function(unit,angle){
    return {
      x:unit * Math.cos((angle * Math.PI) / 180),
      y:unit * Math.sin(( -angle * Math.PI) / 180),
    }
  },
  getVector: function (unitX, unitY) {
    return {
      angle: Math.atan2(-unitY, unitX) * 180 / Math.PI,
      module: Math.sqrt(unitX ** 2 + unitY ** 2)
    }
  }
}