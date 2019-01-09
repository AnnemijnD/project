// Script for the linked.html file. Part of linked views assignment
// Annemijn Dijkhuis
// 11149272

function onload(){

    var format = d3.format(",");

    // Set tooltips
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  return "<strong>Country: </strong><span class='details'>" + "<br></span>" + "<strong>People working in bioeconomics: </strong><span class='details'>" + "</span>";
                })

    // set margins
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = 600 - margin.left - margin.right,
                height = 700 - margin.top - margin.bottom;

    // titles
    var title = d3.select("body")
                .append("h1")
                .text("Aantal aanmeldingen van eerstejaarsstudenten in Nederland in 201? ");

    // create map
    var path = d3.geoPath();

    // make svg
    var svg = d3.select(".container")

                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append('g')
                .attr('class', 'map')


    var projection = d3.geoMercator()
                      .center([ 5, 52 ])
                      .translate([ width/2, height/2])
                      .scale([ width/2 ]);

    var path = d3.geoPath().projection(projection);

    svg.call(tip);

    // load data
    var worldMap = "world_countries.json"

    var requests = [d3.json(worldMap)];


    Promise.all(requests).then(function(response) {
      createHeatMap(response[0])
    }).catch(function(e){
        throw(e);
    });


function createHeatMap(dataMap) {

    var dataById = {};

    // find data of countries
    dataMap.features.forEach(function(d){ d.total = dataById[d.properties['name']]})
    dataMap.features.forEach(function(d){ if (typeof d.total === "undefined") {
                                              d.total = NaN
                                              }
    });
    // find minima and maxima
    let arr = Object.values(dataById);
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    // set color scale
    var color = d3.scaleLinear()
        .domain([0,max])
        .range([255,0]);

    // fill map with the right color
    d3.select('svg')
    .append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(dataMap.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
                                      return "#000000"})
    .style('stroke', 'white')
    .style('stroke-width', 1.5)
    .style("opacity",0.8)

    // tooltips
    .style("stroke","white")
    .style('stroke-width', 0.3)
    .on('mouseover',function(d){
      if ((isNaN(d.total)) === false){
          tip.show(d);

        d3.select(this)
          .style("opacity", 1)
          .style("stroke","white")
          .style("stroke-width",3);
        }
    })
    .on('mouseout', function(d){
      if ((isNaN(d.total)) === false){
        tip.hide(d);
        d3.select(this)
          .style("opacity", 0.8)
          .style("stroke","white")
          .style("stroke-width",0.3);
        }
    })
    .on("click", function(d){
      console.log("hoi")
    })
    //
    // // width and height of legendbar
    // var w = 300, h = 50;
    //
    // // set legendsvg
    // var key = d3.select("svg")
    //    .append("svg")
    //    .attr("height", 200)
    //    .attr("width", w + 10)
    //    .attr("x", 20)
    //    .attr("y", 400);
    //
    // // set linear gradient
    //  var legend = key.append("defs")
    //    .append("svg:linearGradient")
    //    .attr("id", "gradient")
    //    .attr("x1", "0%")
    //    .attr("y1", "100%")
    //    .attr("x2", "100%")
    //    .attr("y2", "100%")
    //    .attr("spreadMethod", "pad");
    //
    // // bar color gradients
    //  legend.append("stop")
    //    .data(dataMap.features)
    //    .attr("stop-color", "rgb("+ color(min) + ",0," + -(color(min) - 255) +")")
    //    .attr("stop-opacity", 0.8);
    //
    //  legend.append("stop")
    //    .attr("offset", "33%")
    //    .attr("stop-color", "rgb("+ color(max*0.33) + ",0," + -(color(max*0.33) - 255) +")")
    //    .attr("stop-opacity", 0.8);
    //
    //  legend.append("stop")
    //    .attr("offset", "66%")
    //    .attr("stop-color", "rgb("+ color(max*0.66) + ",0," + -(color(max*0.66) - 255) +")")
    //    .attr("stop-opacity", 0.8);
    //
    //  legend.append("stop")
    //    .attr("offset", "100%")
    //    .attr("stop-color", "rgb("+ color(max) + ",0," + -(color(max) - 255) +")")
    //    .attr("stop-opacity", 0.8);
    //
    // // make bar
    //  key.append("rect")
    //    .attr("width", w)
    //    .attr("height", h -30)
    //    .style("fill", "url(#gradient)")
    //    .attr("transform", "translate(0, 15)");
    //
    // key.append("text")
    //    .attr("x", 0)
    //    .attr("y", h-5)
    //    .text(0)
    //    .style("font-size", "10px");
    //
    //  key.append("text")
    //     .attr("x", w-30)
    //     .attr("y", h-5)
    //     .text(40000000)
    //     .style("font-size", "10px");
    //
    //  // Title legend
    //  key.append("text")
    //  .attr("x", 0)
    //  .attr("y", 10)
    //  .text("Number of people working in bioeconomics")
    //  .style("font-size", "10px");
    //
    //  // make grey block to define countries without data
    //  d3.select("svg")
    //  .append('rect')
    //  .attr("height", 15)
    //  .attr("width", 20)
    //  .attr("x", 20)
    //  .attr("y", 470)
    //  .style("fill", "#000000")
    //  .style("opacity", 0.8);
    //
    //
    //  d3.select("svg")
    //  .append("text")
    //  .text("= no Data")
    //  .attr("x", 50)
    //  .attr("y", 480);

    // set standard bargraph to the Netherlands

};


}
