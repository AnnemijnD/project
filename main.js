// Script for the index.html file. Part of end project
// Annemijn Dijkhuis
// 11149272

function onload(){
    // d3.select("button")
    // .on("click", function(d){
  //   d3.select('#dropdown li').on('click', function(){
  //     var a = $(this).val();

  // });


    var format = d3.format(",");

    // Set tooltips
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  console.log(d)
                  return "<strong>Stad: </strong><span class='details'>" + d[3] + "<br></span>" + "<strong>Aantal studenten: </strong><span class='details'>" + d[0]+"</span>";
                })

    // set margins
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = 600 - margin.left - margin.right,
                height = 700 - margin.top - margin.bottom;

    // titles
    var title = d3.select(".container")

                .append("h1")
                .text("Aantal aanmeldingen van eerstejaarsstudenten in Nederland in 2017");

    // create map
    var path = d3.geoPath();

    // make svg
    var svg = d3.select(".container")
                .append("div")
                .attr("class", "row")
                .append("div")
                .attr("class", "col-sm-7")
                .attr("id", "map")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                // .append('g')
                // .attr('class', 'map')


    var projection = d3.geoMercator()
                      .center([ 5, 52 ])
                      .translate([ width/2, height/2])
                      .scale([ width*10]);


    var path = d3.geoPath().projection(projection);

    svg.call(tip);

    // load data
    var ned = "nederland.json"
    var data = "eerstejaars.json"

    var requests = [d3.json(ned), d3.json(data)];

    var test = test()



    Promise.all(requests).then(function(response) {
      createHeatMap(response[0], response[1])
    }).catch(function(e){
        throw(e);
    });


function createHeatMap(dataMap, dataStud) {

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

    // var dict2 = {"Maastricht": 200, "Amsterdam": 1000, "Groningen": 500, "Leiden": 400, "Kampen": 100,
    //             "Eindhoven": 100, "Apeldoorn": 200, "Breda": 100, "Rotterdam": 300, "Delft": 200,
    //           "Utrecht": 800,"Wageningen": 400, "Nijmegen": 300, "Enschede": 200, "Tilburg": 400}

    var dict = {}

    dataStud.forEach(function(d){

        if (d["GEMEENTENAAM"] in dict === true ){
              dict[d["GEMEENTENAAM"]][0] = dict[d["GEMEENTENAAM"]][0] + parseInt(d["2017 VROUW"]) + parseInt(d["2017 MAN"])
              }
        else {
            dict[d["GEMEENTENAAM"]] = [parseInt(d["2017 VROUW"]) + parseInt(d["2017 MAN"])]

        }

      })

    dataset.forEach(function(d){

      dict[d[0]].push(d[1])
      dict[d[0]].push(d[2])
      dict[d[0]].push(d[0])
    })


    // find data of countries
    // dataMap.features.forEach(function(d){console.log(d['properties']['name'])})
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
                    .range([4,12]);

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

    .style('stroke', 'white')
    .style('stroke-width', 1.5)
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
          .style("stroke-width",0.3);
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

                      })
                      .on('mouseout', function(d){

                          tip.hide(d);
                          d3.select(this)
                            .style("opacity", 0.8)
                            .style("stroke","white")
                            .style("stroke-width",0.3);

                      });




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
    var graph = lineGraph()

};

function circleXScale(x) {

  var scaled = ((5.6970977783203125 - x) / 0.00920278999983715)

  return 375 - scaled  // The function returns the product of p1 and p2
}

function circleYScale(y){
  var scaled = ((50.8506076217602 - y) / 0.005925835076440901)

  return 543 + scaled

}

function lineGraph(){
  var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 500 - margin.left - margin.right // Use the window's width
  , height = 350 - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = 21;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number
var yScale = d3.scaleLinear()
    .domain([0, 1]) // input
    .range([height, 0]); // output

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

// 1. Add the SVG to the page and employ #2
var svg = d3.select('.row')
              .append("div")
            .attr("class","col-sm-5")
            .attr("id", "line")
            .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
svg.append("path")
    .datum(dataset) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("d", line); // 11. Calls the line generator

// 12. Appends a circle for each datapoint
svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
      .on("mouseover", function(a, b, c) {

        this.attr('class', 'focus')
		})
      .on("mouseout", function() {  })

      var barChartVar = barChart()

}

function barChart() {
  // load data for x and y axis
  var data_lev = []
  var data_pers = []
  d3.json("pers_exp.json").then(function(root) {

        root.forEach(function(element) {
            if (parseInt(element["1-Personele exploitatie"]) > 2){

            data_pers.push(parseInt(element["1-Personele exploitatie"]));
            data_lev.push((element["Leveranciers"]));
        };
    })

      // create SVG
      var svgWidth = 800, svgHeight = 500, barPadding = 5;
      var margin = { top: 150, right: 0, bottom: 50, left: 80};
      var width = svgWidth - margin.left - margin.right;
      var height = svgHeight - margin.top - margin.bottom;
      var barWidth = (width / data_pers.length);


      // set scales
      var yScale = d3.scaleLinear()
          .domain([0, d3.max(data_pers)])
          .range([height, 0]);


      var xScale = d3.scaleBand()
          .domain(data_lev)
          .range([0, width]);

      // set svg
      var svg = d3.select("body").append("div")
          .append('svg')
          .attr("width", svgWidth)
          .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

      // create tooltip, source: https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7
      var tooltip = d3.select("body").append("div").attr("class", "toolTip");

      // creat right axes
      svg.append("g")
        .attr("class", "x axis")
        .attr('transform', "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)
              .ticks(data_lev.length))

        .selectAll("text")
          .style("font-size", "6px")
          .style("text-anchor", "end")
          .attr("dx", "-.7em")
          .attr("dy", ".14em")
          .attr("transform", "translate(0, 0)rotate(-45)")


    // title
    svg.append("text")
        .attr("y", -margin.bottom)
        .attr("x",width/2)
        .attr("dy", "2em")
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Aanmeldingen eerstejaarsstudenten bij [opleiding] aan [instituut] in [jaar]")

      // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10-margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "2em")
        .style("text-anchor", "middle")
        .text("Aantal studenten")


    // text label for the x axis
    svg.append("text")
        .attr("y", svgWidth/2)
        .attr("x", width/2)
        .attr("dy", "2em")
        .style("text-anchor", "middle")
        .text("[opleiding]")


      // create right axes
      svg.append("g")
        .attr("class", "y axis")
        .attr('transform', "translate(0," + 0 +")")
        .call(d3.axisLeft(yScale));


    // make barchart
    var barChart = svg.selectAll("rect")
          .data(data_pers)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("y", function (d) {
                    return yScale(d)
          })
          .attr("height", function(d) {
            return height - yScale(d);
          })
          .attr("width", barWidth - barPadding)
          .attr("transform", function (d,i) {
            var translate = [barWidth * i, 0];
            return "translate(" + translate + ")"})
          .on('mouseover', function(d) {

            // set tooltip
            tooltip
              .style("left", d3.event.pageX - 20 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(d);

            // make the chart diffently colored when mouse is on it
            var self = this;
            d3.selectAll(".bar").filter(function() {
              return self!=this;
            }).transition()
            .style("opacity", .5)


          })
          .on("mouseout", function(d) {
            d3.selectAll(".bar")
            .transition()
            .style("opacity", 5);

            tooltip.style("display", "none");
          });
      });
}

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
  var xJsA = cities[4][2]
  var yJsA = cities[4][3]
  var xGeoA = cities[4][0]
  var yGeoA = cities[4][1]

  // stad B
  var xJsB = cities[i][2]
  var yJsB = cities[i][3]
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



}
