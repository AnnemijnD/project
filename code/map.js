var geoData = [];

function createHeatMap(dataMap, dataStud, jaartal) {

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

  

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {


                return "<strong>Stad: </strong><span class='details'>" +
                d[3] + "<br></span>" +

                "<strong>Aantal studenten: </strong><span class='details'>" +
                d[0]+"</span>";
              })

  var path = d3.geoPath();

  // make svg
  var svg = d3.select("#mapBlock")
              .append("svg")
              .attr("id", "map")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              // .append('g')
              // .attr('class', 'map')


  var projection = d3.geoMercator()
                    .center([ 5, 52 ])
                    .translate([ width/2, height - 180])
                    .scale([ width*10]);


  var path = d3.geoPath().projection(projection);

  svg.call(tip);



  dataStud.forEach(function(d){
    allData.push(d)

  })


  dataset = [['KAMPEN',
              5.9161376953125,
                      52.558820799874695],
            ['GRONINGEN', 6.558837890625,
                      53.216723950863425],
            ['MAASTRICHT', 5.6970977783203125,
                      50.8506076217602],
            ['AMSTERDAM', 4.898529052734375,
                      52.37224556866933],
            ['ROTTERDAM', 4.464225769042969,
                      51.9228847853886],
            ['LEIDEN', 4.481563568115234,
                      52.16055986368401],
            ['DELFT', 4.3581390380859375,
                      52.01119693084988],
            ['UTRECHT', 5.110015869140625,
                      52.095327821920584],
            ['ENSCHEDE', 6.892890930175781,
                      52.220228214941905],
            ['TILBURG', 5.0846099853515625,
                      51.558716715617386],
            ['EINDHOVEN', 5.480461120605469,
                      51.43902871975925],
            ['BREDA', 4.7756195068359375,
                      51.58944283871291],
            ['WAGENINGEN', 5.664825439453125,
                      51.974624029877454],
            ['NIJMEGEN', 5.8632659912109375,
                      51.84214142542858],
            ['APELDOORN', 5.967979431152344,
                      52.214969674901404]]

    var dataById = {};



    var dict = {}


    uniData.forEach(function(d){

        if ((d["GEMEENTENAAM"] in dict === true) ){
              dict[d["GEMEENTENAAM"]][0] = dict[d["GEMEENTENAAM"]][0] + parseInt(d[`TOTAAL ${jaartal}`])
              }
        else {
            dict[d["GEMEENTENAAM"]] = [parseInt(d[`TOTAAL ${jaartal}`])]

        }

      })

    dataset.forEach(function(d){

      dict[d[0]].push(d[1])
      dict[d[0]].push(d[2])
      dict[d[0]].push(d[0])
    })

    mapData = dataset



    // find data of countries
    dataMap.features.forEach(function(d){ d.total = dataById[d.properties['name']]})
    dataMap.features.forEach(function(d){ if (typeof d.total === "undefined") {
                                              d.total = NaN
                                              }
    });
    // find minima and maxima

    let arr = []
        Object.values(dict).forEach(function(d) {
              arr.push(d[0])
    });

    let min = Math.min(...arr);
    let max = Math.max(...arr);

    // set color scale
    var color = d3.scaleLinear()
        .domain([0,max])
        .range([255,0]);

    var dotSize = d3.scaleLinear()
                    .domain([0,max])
                    .range([4,9]);

    // fill map with the right color
    d3.select('svg')
    .append("g")
    .attr("class", "provincies")
    .selectAll("path")
    .data(dataMap.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
                                      return '#4D80B3'

                                  })
    .style("opacity",0.8)
    .style("position", "relative")
    .style('z-index', "-1")

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
          .style("stroke-width",0);
        }
    })


    var circle = svg.selectAll("circle")
                      .data(Object.values(dict))
                      .enter()
                      .append("circle")

                      .attr("cx", function(d) {

                        return circleXScale(d[1]);
                      })
                      .attr("cy", function(d) {
                        return circleYScale(d[2]);
                      })
                      // // .scale([ width*10])
                      .attr("id", function(d){

                              return d[3]
                      })

                      .attr("r", function(d){
                        return  dotSize(d[0]);
                      })
                      .attr("class", "circle")
                      .style("position", "relative")
                      .style("z-index", "1000")
                      .style("fill", function(d) {
                                                    return "rgb("+ color(d[0]) + ",0," + -(color(d[0]) - 255) +")"
                                                  })
                      .on('mouseover',function(d){

                          tip.show(d);

                          d3.select(this)
                            .style("opacity", 1)
                            .style("stroke","white")
                            .style("stroke-width",3);

                            var self = this;
                            d3.selectAll(".circle").filter(function() {
                              return self!=this;
                            }).transition()
                            .style("opacity", .5)

                      })
                      .on('mouseout', function(d){


                          tip.hide(d);
                          d3.select(this)
                            .style("opacity", 0.8)
                            .style("stroke","white")
                            .style("stroke-width",0);

                            var self = this;
                            d3.selectAll(".circle").filter(function() {
                              return self!=this;
                            }).transition()
                            .style("opacity", 1)

                      });




    // width and height of legendbar
    var w = 300, h = 50;

    // set legendsvg
    var key = d3.select("svg")
       .append("svg")
       .attr("height", 200)
       .attr("width", w + 10)
       .attr("x", 20)
       .attr("y", 400);


    // source: https://bl.ocks.org/duspviz-mit/9b6dce37101c30ab80d0bf378fe5e583
    // set linear gradient
     var legend = key.append("defs")
       .append("svg:linearGradient")
       .attr("id", "gradient")
       .attr("x1", "0%")
       .attr("y1", "100%")
       .attr("x2", "100%")
       .attr("y2", "100%")
       .attr("spreadMethod", "pad");

    // bar color gradients
     legend.append("stop")
       .data(dataMap.features)
       .attr("stop-color", "rgb("+ color(min) + ",0," + -(color(min) - 255) +")")
       .attr("stop-opacity", 0.8);

     legend.append("stop")
       .attr("offset", "33%")
       .attr("stop-color", "rgb("+ color(max*0.33) + ",0," + -(color(max*0.33) - 255) +")")
       .attr("stop-opacity", 0.8);

     legend.append("stop")
       .attr("offset", "66%")
       .attr("stop-color", "rgb("+ color(max*0.66) + ",0," + -(color(max*0.66) - 255) +")")
       .attr("stop-opacity", 0.8);

     legend.append("stop")
       .attr("offset", "100%")
       .attr("stop-color", "rgb("+ color(max) + ",0," + -(color(max) - 255) +")")
       .attr("stop-opacity", 0.8);

    // make bar
     key.append("rect")
       .attr("width", w/2)
       .attr("height", h -30)
       .style("fill", "url(#gradient)")
       .attr("transform", "translate(0, 15)");

    key.append("text")
       .attr("x", 0)
       .attr("y", h-5)
       .text(0)
       .style("font-size", "10px");

     key.append("text")
        .attr("x", w/2 -10)
        .attr("y", h-5)
        .text(max)
        .style("font-size", "10px");

     // Title legend
     key.append("text")
     .attr("x", 0)
     .attr("y", 10)
     .text("Aantal studenten")
     .style("font-size", "10px");

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

    // makeDropdowns
    var button = d3.select("#dropdownInst")
        .append("div")
        .attr("class", "dropdown")
        .attr("id", 'dropLine-1')
        .append("button")
        .attr("class", "btn btn-default dropdown-toggle")
        .attr("type", "button")
        .attr("data-toggle", "dropdown")
        .text("Instituut")
        .append("span")
        .attr("class", "caret")

    var emptyDropLine = d3.select("#dropLine-1")
                          .append("ul")
                          .attr("id", "dropdown-instelling")
                          .attr("class", "dropdown-menu")

    // makeDropdowns
    var button = d3.select("#dropdownOpl")
        .append("div")
        .attr("class", "dropdown")
        .attr("id", 'dropLine-2')
        .append("button")
        .attr("class", "btn btn-default dropdown-toggle")
        .attr("type", "button")
        .attr("data-toggle", "dropdown")
        .text("Opleiding")
        .append("span")
        .attr("class", "caret")

    var emptyDropLine2 = d3.select("#dropLine-2")
                          .append("ul")
                          .attr("id", "dropdown-opleiding")
                          .attr("class", "dropdown-menu")


    // set standard bargraph to the Netherlands
    var linegraphvar = lineGraph("Universiteit van Amsterdam", "Biomedische Wetenschappen")
    var dropdowns = makeDropdowns(dataStud)
    // var barChartVar = barChart(dataStud)
    var barGraphVar = barGraph()
    // var samsBarvar = samsBar()

};

function circleXScale(x) {

  var scaled = ((5.6970977783203125 - x) / 0.00920278999983715)/1.5

  return 375/1.5 - scaled
}

function circleYScale(y){
  var scaled = ((50.8506076217602 - y) / (0.005925835076440901))/1.5

  return 543/1.5 + scaled + 50

}

function updateMap(jaar){



}
