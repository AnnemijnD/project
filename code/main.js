// Script for the index.html file. Part of end project
// Annemijn Dijkhuis
// 11149272

var barGraphData = [];
var lineGraphData = [];
var mapData = [];
var allData = [];
var uniData = [];
var geoData = [];
var firstYear = 2013;
var lastYear = 2017;
var message = "Maximaal vier staafdiagramgroepen of lijnen." +
" Verwijder eerst data door op een staaf of gekleurd legendablok te klikken."


function onload(){

  // laad alle data
  var ned = "../data/nederland.json"
  var dataEerstejaars = "../data/eerstejaars.json"
  var dataUni = "../data/instellingen.json"
  var geoDataSteden = "../data/geoDataSteden.json"

  var requests = [d3.json(ned), d3.json(dataEerstejaars), d3.json(dataUni),
                  d3.json(geoDataSteden)];

  Promise.all(requests).then(function(response) {

    uniData = response[2]
    geoData = response[3]
    allData = response[1]

        createMap(response[0], response[1], firstYear);
        lineGraph();
        barGraph();

  }).catch(function(e){
      throw(e);
  });

}
