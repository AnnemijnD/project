function test(){

  var cities = [[4.898529052734375,
          52.37224556866933, 279, 288], [ 4.295654296875,
          52.1098789403549, 230, 330], [6.558837890625,
          53.216723950863425, 465, 140],[5.6970977783203125,
          50.8506076217602, 375, 543], [4.7625732421875,
          52.95194755829188, 274, 190]]

  var xfactors = []
  var yfactors = []

  for (i = 0; i < cities.length; i++) {

  // stad A
  var xJsA = cities[4][2]/2
  var yJsA = cities[4][3]/2
  var xGeoA = cities[4][0]
  var yGeoA = cities[4][1]

  // stad B
  var xJsB = cities[i][2]/2
  var yJsB = cities[i][3]/2
  var xGeoB = cities[i][0]
  var yGeoB = cities[i][1]

  // voor x as
  var x1 = xJsA - xJsB
  var x2 = xGeoA - xGeoB
  var xfactor = Math.abs(x2/x1)
  if ((isNaN(xfactor)) === false){
      xfactors.push(xfactor);
  }



  // voor y as
  var y1 = yJsA - yJsB
  var y2 = yGeoA - yGeoB
  var yfactor = Math.abs(y2/y1)

  if ((isNaN(yfactor)) === false){
      yfactors.push(yfactor);
  }


}

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
var averageX = average(xfactors)
var averageY = average(yfactors)
return 1
}
