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

    // create map
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
                      .translate([ width/2, height/2])
                      .scale([ width*10]);


    var path = d3.geoPath().projection(projection);

    svg.call(tip);

    // load data
    var ned = "nederland.json"
    var data = "eerstejaars.json"

    var requests = [d3.json(ned), d3.json(data)];

    var test = test()




          // document.getElementById('myRange').innerHTML = this.value
          // console.log(document.getElementById("myRange"))
          Promise.all(requests).then(function(response) {
          //   if (isNaN(this.value)){
          //     console.log("jeej")
          //     jaartal = 2017
          //   }
          //   else {
          //     jaartal = this.value
          //
          //   }

            return createHeatMap(response[0], response[1], 2017)
          }).catch(function(e){
              throw(e);
          });

function createHeatMap(dataMap, dataStud, jaartal) {

  // <div class="slidecontainer">
  //     <input type="range" min="2013" max="2017" value="2017" class="slider" id="myRange" oninput="sliderChange(this.value)">
  // </div>




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


    dataStud.forEach(function(d){

        if (d["GEMEENTENAAM"] in dict === true ){
              dict[d["GEMEENTENAAM"]][0] = dict[d["GEMEENTENAAM"]][0] + parseInt(d[`${jaartal} VROUW`]) + parseInt(d[`${jaartal} MAN`])
              }
        else {
            dict[d["GEMEENTENAAM"]] = [parseInt(d[`${jaartal} VROUW`]) + parseInt(d[`${jaartal} MAN`])]

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
    var linegraphvar = lineGraph(dataStud, "Amsterdam", "Biomedische Wetenschappen")
    var dropdowns = makeDropdowns(dataStud)
    var barChartVar = barChart(dataStud)
    // var samsBarvar = samsBar()

};

function circleXScale(x) {

  var scaled = ((5.6970977783203125 - x) / 0.00920278999983715)

  return 375 - scaled
}

function circleYScale(y){
  var scaled = ((50.8506076217602 - y) / 0.005925835076440901)

  return 543 + scaled

}

function lineGraph(dataStud, instelling, opleiding){

  d3.select("#line")
    .remove()


  //input
  // UvA Bmw 2017
  // var instelling = "Leiden"



  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {

                return "<strong>Aantal studenten: </strong><span class='details'>"+ d.y +"</span>";
              })

  // svg
  var margin = {top: 50, right: 50, bottom: 50, left: 50, yPadding: 10}
  , width = 500 - margin.left - margin.right // Use the window's width
  , height = 350 - margin.top - margin.bottom; // Use the window's height



datapoints = []
// get number of datapoints
var keys = Object.keys(dataStud[0])

keys.forEach(function(d){
  var splitd = d.split(" ", d.length)
  var year = parseInt(splitd[0])
  if (isNaN(year) === false){
    if (datapoints.includes(year) === false){
    datapoints.push(year)
    }
  }
})


var n = datapoints.length;


dataset = [];
// get right dataset

dataStud.forEach(function(d){
    if (d["OPLEIDINGSNAAM ACTUEEL"].includes(opleiding)){
      if (d["INSTELLINGSNAAM ACTUEEL"].includes(instelling)){

        // get data of all years
        datapoints.forEach(function(a){
          var jaar = a;
          var vrouwen = parseInt((d[`${jaar} VROUW`]));
          var mannen = parseInt((d[`${jaar} MAN`]));

          // check for double data
          var duplicate = false;
          dataset.forEach(function(d, i) {
            if (d.x === jaar){
              d.y += (mannen + vrouwen)
              duplicate = true;
            }
          })

          // adds data to dataset
          if (duplicate === false){
          coordinates = {};
          coordinates['x'] = jaar;
          coordinates['y'] = mannen + vrouwen;
          dataset.push(coordinates)
          };
        })
      }
    }
  })


  // get mininma and maxima
  let arr = []
  Object.values(dataset).forEach(function(d) {
            arr.push(d.y);
  });
  let min = Math.min(...arr);
  let max = Math.max(...arr);

// 5. X scale
var xScale = d3.scaleLinear()
    .domain([2013,2017]) // input
    .range([0, width]); // output

// 6. Y scale
var yScale = d3.scaleLinear()
    .domain([0, max + margin.yPadding]) // input
    .range([height, 0]); // output

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 1. Add the SVG to the page and employ #2
var svg = d3.select('#lineBlock')
            .append("svg")
            .attr("id", "line")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
     // Create an axis component with d3.axisBottom

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
    .attr("cx", function(d, i) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
      .on("mouseover", function(d) {

        tip.show(d)
		})
      .on("mouseout", function(d) { tip.hide(d) })







}

function barChart(dataStud) {
  // load data for x and y axis


  var barData = []
  var barDataY = ["Vrouw", "Man"]
  var opleiding = "Biomedische Wetenschappen"
  var instelling = "Universiteit van Amsterdam"
  var jaar = "2017"

  dataStud.forEach(function(d){

      if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){

        if (d["OPLEIDINGSNAAM ACTUEEL"].includes(opleiding)){

            var vrouwen = parseInt((d[`${jaar} VROUW`]));
            var mannen = parseInt((d[`${jaar} MAN`]));

            barData.push(vrouwen);
            barData.push(mannen);
        }
      }
  })


      dataformat = [{Aantal: 64, Geslacht:"Vrouw1"}, {Aantal: 28, Geslacht: "Man1"}, {Aantal: 99, Geslacht: "Vrouw2"}, {Aantal:80, Geslacht:"Man2"}]
      data2 = [{Instelling: "UvA", Opleiding: "bmw", jaar:'2017', Man: 200, Vrouw: 300},
              {Instelling: "UvA", Opleiding: "Bmw", jaar:'2016', Man: 150, Vrouw: 200}]
            // {Instelling: "rad", Opleiding: "bmw", jaar:'2017', Man: 10, Vrouw: 100}
      // d3.select("#graph1")
      //   .append("svg")
      //   .attr("id", "barGraphSVG")

      var svg = d3.select("#graph1 svg"),
          margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



      // source: https://bl.ocks.org/mbostock/raw/3887051/
      var x0 = d3.scaleBand()
          .rangeRound([0, width])
          .paddingInner(0.1);


      var x1 = d3.scaleBand()
          .padding(0.05);

      var y = d3.scaleLinear()
          .rangeRound([height, 0]);

      var z = d3.scaleOrdinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      columns1 = ["Geslacht", "Aantal"];

      columns_f = []

      // // console.log(Object.keys(dataformat[0]))
      // d3.csv("data_final.csv").then(function(d, i, columns)  {
      //
      //
      //   for (var i = 1, n = d["columns"].length; i < n; ++i)
      //   console.log(d[d.columns[i]]),
      //   d[d.columns[i]] = +d[d.columns[i]];
      //   return d;
      // }, function(error, data)

        console.log(data2)
        // if (error) throw error;

        var keys = ["Vrouw", "Man"]

        // var keys = data.columns.slice(1);



        x0.domain(data2.map(function(d) { return d.Instelling + d.Opleiding + d.jaar; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, 300]).nice();


        d3.select("#graph1 svg g")
          // .append("svg")
          .append("g")
          .selectAll("g")
          .data(data2)
          .enter().append("g")
            .attr("transform", function(d) { return "translate(" + x0(d.Instelling + d.Opleiding + d.jaar) + ",0)"; })
          .selectAll("rect")
          .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
          .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return z(d.key); })
            .attr("class", "bar")
            .on('mouseover', function(d) {

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

              });;


        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
          .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Population");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
          .selectAll("g")
          .data(keys.slice().reverse())
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);


        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });
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




function sliderChange(val) {
document.getElementById('myRange').innerHTML = val;

}
function makeDropdowns(dataStud){

  instituten = []


  dataStud.forEach(function(d){
  if (!(instituten.includes(d["INSTELLINGSNAAM ACTUEEL"]))){
    instituten.push(d["INSTELLINGSNAAM ACTUEEL"])
  }

  })

  var emptyDropLine = d3.select("#dropdown-instelling")

      emptyDropLine.selectAll("li")
                    .data(instituten)
                    .enter()
                    .append("li")
                    .attr("value", function(d){
                      return d;
                    })
                    .text(function(d){
                      return d;
                    })
                    .on("mouseover", function(d){
                      d3.select(this)
                      .style("color", "blue")

                    })
                    .on("mouseout", function(d){
                      d3.select(this)
                      .style("color", "black")
                    })
                    .on("click", function(d){
                      d3.selectAll("#dropdown-opleiding li")
                        .remove()

                      d3.select("#dropLine-2")
                        .select('button')
                        .text("Opleiding")

                      var instelling = d

                      opleidingen = []


                      d3.select("#dropLine-1 button")
                      .text(instelling)
                      dataStud.forEach(function(x){
                        if(x["INSTELLINGSNAAM ACTUEEL"] === instelling){
                          if (!(opleidingen.includes(x["OPLEIDINGSNAAM ACTUEEL"]))){
                            opleidingen.push(x["OPLEIDINGSNAAM ACTUEEL"])
                          }

                        }
                      })


                      d3.select("#dropdown-opleiding")
                        .selectAll("li")
                        .data(opleidingen)
                        .enter()
                        .append("li")
                        .attr("value", function(d){
                          return d;
                        })
                        .text(function(d){
                          return d;
                        })
                        .on("mouseover", function(d){
                          d3.select(this)
                          .style("color", "blue")

                        })
                        .on("mouseout", function(d){
                          d3.select(this)
                          .style("color", "black")
                        })
                        .on("click", function(d){
                          opleiding = d
                          d3.select("#dropLine-2 button")
                          .text(opleiding)
                          lineGraph(dataStud, instelling, opleiding)
                        })


                    });

}



// Studentnummer : 12442690
// Naam: Sam Kuilboer

// Sources:
// https://bl.ocks.org/lorenzopub/352ad2e6f577c4abf55e29e6d422535a
// https://blockbuilder.org/guilhermesimoes/8913c15adf7dd2cab53a
// https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f

// function samsBar() {
//
//   var margin = {top: 50, right:50, bottom:100, left:50};
//   var width = 960 - margin.left - margin.right;
//   var height = 600 - margin.top - margin.bottom;
//   var duration = 800;
//
//   var svg = d3.select("body")
//       .append("svg")
//       .attr("width", (width + margin.left + margin.right))
//       .attr("height", (height + margin.top + margin.bottom))
//   .append("g")
//       .attr("transform", "translate(" + (margin.left + margin.right) + ")");
//
//   var g = svg.append("g")
// 			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   var color = d3.scaleOrdinal()
//       .domain(["Male", "Female"])
//       .range(["blue", "red"])
//
//   d3.json("data_sam.json").then(function(data) {
//     drawGroupedStackedBarChart(data);
//   });
//
//
//   function type(d) {
//     d.year = new Date(d.year);
//     d.population = +d.population;
//     return d;
//   }

  // function drawGroupedStackedBarChart(data) {
  //
  //     var id = [];
  //     var men = [];
  //     var women = [];
  //     for (i = 0; i < data.length; i++) {
  //       var value = data[i].Country
  //       var value1 = data[i].Male
  //       var value2 = data[i].Female
  //       id.push(value)
  //       men.push(value1)
  //       women.push(value2)
  //     };
  //
  //     var x0 = d3.scaleBand()
  //         .range([0, width - margin.left - margin.right], .2);
  //     var x1 = d3.scaleBand()
  //         .padding(0.2);
  //     var y = d3.scaleLinear()
  //         .range([height, 0]);
  //     var xStack = d3.scaleBand()
  //         .domain(id)
  //         .range([0, width - margin.left - margin.right])
  //         .align(0.1)
  //         .padding(0.2);
  //     var yStack = d3.scaleLinear()
  //         .domain([0, (d3.max(women) + d3.max(men))])
  //         .range([height, 0])
  //
  //     var xAxis = d3.axisBottom()
  //         .ticks(id)
  //         .scale(xStack)
  //     var yAxis = d3.axisLeft()
  //         .scale(yStack)
  //
  //     // drawing the x-axis
  //     svg.append("g")
  //         .attr("class", "x-axis")
  //         .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
  //         .call(xAxis)
  //       .selectAll("text")
  //         .attr("x", -8)
  //         .attr("y", 6)
  //         .attr("transform", "rotate(-40)")
  //         .style("text-anchor", "end");
  //
  //     // drawing the y-axis
  //     svg.append("g")
  //       .attr("class", "y-axis")
  //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  //       .call(yAxis)
  //
  //     svg.append("text")
  //       .attr("class", "label")
  //       .attr("x", 0-margin.left)
  //       .attr("y", -50)
  //       .attr("transform", "rotate(-90)")
  //       .attr("dy", "1.5em")
  //       .style("text-anchor", "end")
  //       .text("Headcount population");
  //
  //     var keys = d3.keys(data[0]).slice(1);
  //     var total = [];
  //     data.forEach(function(d) {
  //       total.push(d3.sum(keys,function(symbol) {return d[symbol];}))
  //     })
  //
  //     x0.domain(data.map(function(d) {return d.Country}));
  //
  //     x1.domain(keys)
  //         .range([0,x0.bandwidth()-10]);
  //     y.domain([0,d3.max(data, function(d) {return d3.max(keys, function(symbol) {return d[symbol]})})]);
  //
  //     xStack.domain(data.map(function(d) {return d.Country}));
  // 		yStack.domain([0,d3.max(total)]);
  //     // console.log(d3.max(total));
  //
  //     var grouped = g.append("g")
  //   			.selectAll("g")
  //   			.data(d3.stack().keys(keys)(data))
  //   			.enter()
  //   			.append("g")
  //   			.attr("fill",function(d) {return color(d.key)});
  //
  //     var rect = grouped.selectAll("rect")
  //   			.data(function(d) {return d;})
  //   			.enter()
  //   			.append("rect")
  //   			.attr("x",function(d) {console.log(d); return xStack(d.data.Country);})
  //   			.attr("y",function(d) {return yStack(d[1]);})
  //   			.attr("height",function(d) {return yStack(d[0]) - yStack(d[1]);})
  //   			.attr("width",xStack.bandwidth());
  //
  //     d3.selectAll("input")
  //         .on("change", changed);
  //
  //
  //     function changed() {
  //         if (this.value ==="grouped") GroupedBar();
  //         else StackedBar();
  //     }
  //
  //     function GroupedBar() {
  // 				rect
  // 				.transition()
  // 				.duration(duration)
  // 				.attr("width", x1.bandwidth())
  // 				.transition()
  // 				.duration(duration)
  // 				.attr("x",function(d,i) {
  // 					return x0(d.data.Country) + x1(this.parentNode.__data__.key);
  // 				})
  // 				.transition()
  // 				.duration(duration)
  // 				.attr("y",function(d) {return y(d[1]-d[0]);})
  // 				.attr("height",function(d) {return y(0)-y(d[1]-d[0]);});
  //
  //         var yScaleGrouped = d3.scaleLinear()
  //             .domain([0, d3.max(women)])
  //             .range([height, 0])
  //
  //         d3.select(".y-axis")
  //           .transition()
  //           .duration(duration)
  //           .call(d3.axisLeft(yScaleGrouped))
  //     };
  //
  //     function StackedBar() {
  //   				rect
  //   				.transition()
  //   				.duration(duration)
  //   				.attr("y",function(d) {return yStack(d[1]-d[0]);})
  //   				.attr("height",function(d){return yStack(d[0])-yStack(d[1]);})
  //   				.transition()
  //   				.duration(duration)
  //   				.attr("y", function(d) {return yStack(d[1]);})
  //   				.transition()
  //   				.duration(duration)
  //   				.attr("x",function(d) {return xStack(d.data.Country);})
  //   				.attr("width",xStack.bandwidth());
  //
  //           var yScaleGrouped = d3.scaleLinear()
  //               .domain([0, (d3.max(women) + d3.max(men))])
  //               .range([height, 0])
  //
  //           d3.select(".y-axis")
  //             .transition()
  //             .duration(duration)
  //             .call(d3.axisLeft(yScaleGrouped))
  //   	};
  //
  //
  //
  // 	// positions the group and gives the class legend
  // 	var legend = svg.selectAll(".legend")
  // 	.data(color.domain())
  // 	.enter()
  // 	.append("g")
  // 	.attr("class","legend")
  // 	.attr("transform",function(d,i) {
  // 		return "translate(0," + i * 15 + ")";
  // 	});
  //
  // 	legend.append("path")
  // 	.style("fill",function(d) {return color(d);})
  // 	.attr("d", d3.symbol().type(d3.symbolSquare).size(120))
  // 	.attr("transform",function(d) {
  // 		return "translate (" + width/5 + "," + 10 +")";
  // 	})
  //
  // 	legend.append("text")
  // 	.attr("x",width/5 + 15)
  // 	.attr("y",10)
  // 	.attr("dy",".30em")
  // 	.text(function(d) {return d;})
  //
  // 	svg.append("text")
  // 	.attr("x",width/2 - 40)
  // 	.attr("y",20)
  // 	.attr("dy",".20em")
  // 	.attr("font-size",25)
  // 	.text("Population per Country")
  // 	.attr("class","title")
  // };

}
