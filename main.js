// Script for the index.html file. Part of end project
// Annemijn Dijkhuis
// 11149272

var barGraphData = [];
var lineGraphData = [];
var mapData = [];
var allData = [];
var uniData = [];

function onload(){

    var format = d3.format(",");

    // set margins
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = 600/1.5 - margin.left - margin.right,
                height = 700/1.5 - margin.top - margin.bottom;

    // titles
    var title = d3.select(".container")

                .append("h1")
                .text("Aantal aanmeldingen van eerstejaarsstudenten in Nederland in 2017");


    var slider = d3.select("#mapBlock")
                  .append("div")
                  .attr("class", "slidecontainer")
                  .append("input")
                  .attr("type", "range")
                  .attr("min", "2013")
                  .attr("max", "2017")
                  .attr("value", "2017")
                  .attr("class", "slider")
                  .attr("id", "myRange")
                  .on("input", function(d){
                    return console.log(this.value)
                  })

    // create map


    // load data
    var ned = "data/nederland.json"
    var dataEerstejaars = "data/eerstejaars.json"
    var dataUni = "data/instellingen.json"

    var requests = [d3.json(ned), d3.json(dataEerstejaars), d3.json(dataUni)];

    var test = test()

          // document.getElementById('myRange').innerHTML = this.value

          Promise.all(requests).then(function(response) {
          //   if (isNaN(this.value)){
          //     jaartal = 2017
          //   }
          //   else {
          //     jaartal = this.value
          //
          //   }
            uniData = response[2]
             createHeatMap(response[0], response[1], 2017)
             makeDropdowns(allData)
            return
          }).catch(function(e){
              throw(e);
          });


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




function sliderChange(val) {
document.getElementById('myRange').innerHTML = val;

}



}
