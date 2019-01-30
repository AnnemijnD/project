// Script for the vis.html file. Part of end project
// Annemijn Dijkhuis
// 11149272

var BARGRAPHDATA = [];
var LINEGRAPHDATA = [];
var ALLDATA = [];
var UNIDATA = [];
var GEODATA = [];
var FIRSTYEAR = 2013;
var LASTYEAR = 2017;
var MESSAGE = "Maximaal vier staafdiagramgroepen of lijnen." +
" Verwijder eerst data door op een staaf of gekleurd legendablok te klikken."


function onload(){

  // laad alle data
  var ned = "../data/nederland.json"
  var dataEerstejaars = "../data/eerstejaars.json"
  var dataUni = "../data/instellingen.json"
  var GEODATASteden = "../data/GEODATASteden.json"

  var requests = [d3.json(ned), d3.json(dataEerstejaars), d3.json(dataUni),
                  d3.json(GEODATASteden)];

  Promise.all(requests).then(function(response) {

    UNIDATA = response[2]
    GEODATA = response[3]
    ALLDATA = response[1]

        createMap(response[0]);
        lineGraph();
        barGraph();

  }).catch(function(e){
      throw(e);
  });

}
