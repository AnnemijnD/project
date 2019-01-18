// Script for the index.html file. Part of end project
// Annemijn Dijkhuis
// 11149272

var barGraphData = [];
var lineGraphData = [];
var mapData = [];
var allData = [];

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
                      .translate([ width/2, height - 180])
                      .scale([ width*10]);


    var path = d3.geoPath().projection(projection);

    svg.call(tip);

    // load data
    var ned = "data/nederland.json"
    var data = "data/eerstejaars.json"

    var requests = [d3.json(ned), d3.json(data)];

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

            return createHeatMap(response[0], response[1], 2017)
          }).catch(function(e){
              throw(e);
          });

function createHeatMap(dataMap, dataStud, jaartal) {

  // <div class="slidecontainer">
  //     <input type="range" min="2013" max="2017" value="2017" class="slider" id="myRange" oninput="sliderChange(this.value)">
  // </div>

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
    var linegraphvar = lineGraph(dataStud, "Universiteit van Amsterdam", "Biomedische Wetenschappen")
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

function lineGraph(dataStud, instelling, opleiding){

  d3.select("#line")
    .remove()

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
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
     // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
svg.append("path")
    .datum(dataset) // 10. Binds data to the line
    .attr("class", "line")
    .attr("id", "realline")
   // 11. Calls the line generator // Assign a class for styling
    .attr("d", line);



// 12. Appends a circle for each datapoint
svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
    .attr("value", function(d){return [instelling, opleiding]})
      .on("mouseover", function(d) {

        tip.show(d)
		})
      .on("mouseout", function(d) { tip.hide(d) })
      .on("click", function(d) {
        console.log(d3.select(this).select("value"))

        return updateBarGraph(opleiding, instelling, `${d.x}`)});
}

function updateLine (dataStud, opleiding, instelling){

  // svg
  var margin = {top: 50, right: 50, bottom: 50, left: 50, yPadding: 10}
  , width = 500 - margin.left - margin.right // Use the window's width
  , height = 350 - margin.top - margin.bottom; // Use the window's height

  var duration = 800;
    // d3.select("#line")
    //   .remove()

    // Set tooltips
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {

                  return "<strong>Aantal studenten: </strong><span class='details'>"+ d.y +"</span>";
                })


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

  // 3. Call the x axis in a group tag
  d3.select(".yAxis")
    .transition()
    .duration(duration)
    .call(d3.axisLeft(yScale))

  // 9. Append the path, bind the data, and call the line generator
  d3.select(".line")
      .datum(dataset) // 10. Binds data to the line
      .transition()
      .duration(duration)
      .attr("d", function(d) { return line(d); })


  // 12. Appends a circle for each datapoint
  d3.selectAll(".dot")
      .data(dataset)
      .transition()
      .duration(duration)
      .attr("cx", function(d, i) { return xScale(d.x) })
      .attr("cy", function(d) { return yScale(d.y) })
      .attr("value", function(d){return [instelling, opleiding]})





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

            barData.push({Instelling: instelling, Opleiding: opleiding, jaar:jaar, Man: mannen, Vrouw: vrouwen});

        }
      }
  })


      data2 = [{Instelling: "UvA", Opleiding: "bmw", jaar:'2017', Man: 200, Vrouw: 300},
              {Instelling: "UvA", Opleiding: "Bmw", jaar:'2016', Man: 150, Vrouw: 200}]
            // {Instelling: "rad", Opleiding: "bmw", jaar:'2017', Man: 10, Vrouw: 100}
      // d3.select("#graph1")
      //   .append("svg")
      //   .attr("id", "barGraphSVG")

      margin = {top: 20, right: 20, bottom: 30, left: 40}
      var svg = d3.select("#graph1 svg")
                  .attr("width", 600 - margin.left - margin.right)
                  .attr("height", 400 - margin.bottom - margin.top)



      width = +svg.attr("width") - margin.left - margin.right

      height = +svg.attr("height") - margin.top - margin.bottom

      var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


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


      // d3.csv("data_final.csv").then(function(d, i, columns)  {
      //
      //
      //   for (var i = 1, n = d["columns"].length; i < n; ++i)

      //   d[d.columns[i]] = +d[d.columns[i]];
      //   return d;
      // }, function(error, data)


        // if (error) throw error;

        var keys = ["Vrouw", "Man"]

        // var keys = data.columns.slice(1);



        x0.domain(data2.map(function(d) { return d.Instelling + d.Opleiding + d.jaar; }));
        // x0.domain([0,1]);
        // x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0,d3.max(data2, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice()
        d3.select("#graph1 svg g")
          .attr("id", "grid")
          .append("g")
          .selectAll("g")
          .data(data2)
          .enter().append("g")
            .attr('class', "barG")
            .attr("transform", function(d, i) { return "translate(" + x0(d.Instelling + d.Opleiding + d.jaar) + ",0)"; })
          .selectAll("rect")
          .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
          .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) {return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return z(d.key); })
            .attr("class", "bar")
            .on('click', function(d) {
              data1 = [{Instelling: "rad", Opleiding: "bmw", jaar:'2017', Man: 20, Vrouw: 30},
                      {Instelling: "rad", Opleiding: "Bmw", jaar:'2016', Man: 120, Vrouw: 100}]


              updateBarGraph(opleiding, instelling, jaar)
            })

            //   d3.select("#grid g")
            //   .selectAll("g")
            //   .data(data1)
            //   .enter().append("g")
            //     .attr("transform", function(d) { return "translate(" + x0(d.Instelling + d.Opleiding + d.jaar) + ",0)"; })
            //   .selectAll("rect")
            //   .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
            //   .enter().append("rect")
            //     .transition()
            //     .attr("x", function(d) { return x1(d.key); })
            //     .attr("y", function(d) { return y(d.value); })
            //     .attr("width", x1.bandwidth())
            //     .attr("height", function(d) { return height - y(d.value); })
            //     .attr("fill", function(d) { return z(d.key); })
            //     .attr("class", "bar")
            //
            //     g.select('g').remove().transition();
            //
            //     g.select("g")
            //         .transition()
            //         .attr("class", "xAxisB")
            //         .attr("transform", "translate(0," + height + ")")
            //         .call(d3.axisBottom(x0));
            //
            //
            //     g.select("g")
            //         .transition()
            //         .attr("class", "yAxisB")
            //         .call(d3.axisLeft(y).ticks(null, "s"))
            //       // .append("text")
            //       //   .attr("x", 2)
            //       //   .attr("y", y(y.ticks().pop()) + 0.5)
            //       //   .attr("dy", "0.32em")
            //       //   .attr("fill", "#000")
            //       //   .attr("font-weight", "bold")
            //       //   .attr("text-anchor", "start")
            //       //   .text("Population");
            //
            //
            //   // // make the chart diffently colored when mouse is on it
            //   // var self = this;
            //   // d3.selectAll(".bar").filter(function() {
            //   //   return self!=this;
            //   // }).transition()
            //   // .style("opacity", .5)
            // //
            // //
            //   })
            //   .on("mouseout", function(d) {
            //     d3.selectAll(".bar")
            //     .transition()
            //     .style("opacity", 5);
            //
            //   });;



        g.append("g")
            .attr("class", "xAxisB")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        g.append("g")
            .attr("class", "axis")
            .attr("id", "yAxisB")
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
                          updateLine(dataStud, opleiding, instelling)
                        })


                    });

}

function updateBar(opleiding, jaar, instelling, data2){

  margin = {top: 20, right: 20, bottom: 30, left: 40}
  var svg = d3.select("#graph1 svg")
              .attr("width", 600 - margin.left - margin.right)
              .attr("height", 400 - margin.bottom - margin.top)
  var duration = 800

  // data2 = [{Instelling: "UvA", Opleiding: "bmw", jaar:'2017', Man: 200, Vrouw: 300},
  //         {Instelling: "UvA", Opleiding: "Bmw", jaar:'2016', Man: 150, Vrouw: 200}]

  var extra = [{Instelling: "UvA", Opleiding: "bmw", jaar:'2017', Man: 200, Vrouw: 300},
          {Instelling: "UvA", Opleiding: "Bmw", jaar:'2016', Man: 150, Vrouw: 200}, {Instelling: "Rad", Opleiding: "Wiskunde", jaar: '2015', Man: 245, Vrouw: 434},
        {Instelling: "Rad", Opleiding: "Wiskunde", jaar: '2014', Man: 245, Vrouw: 434}]

  var extra2 = [{Instelling: "Rad", Opleiding: "Wiskunde", jaar: '2015', Man: 245, Vrouw: 434},
        {Instelling: "Rad", Opleiding: "Wiskunde", jaar: '2014', Man: 245, Vrouw: 434}]
  width = +svg.attr("width") - margin.left - margin.right

  height = +svg.attr("height") - margin.top - margin.bottom

  // var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);


  var x1 = d3.scaleBand()
      .padding(0.05);

  var y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0,434]);


  var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var keys = ["Vrouw", "Man"]

  keyValue = []

  extra.forEach(function(d){
    keys.forEach(function(key){
      return keyValue.push({key:key, value: d[key]})
    })
  })


  x0.domain(extra.map(function(d) { return d.Instelling + d.Opleiding + d.jaar; }));
  // x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    y.domain([0,d3.max(extra, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice()


  d3.select("#yAxisB")
    .transition()
    .duration(duration)
    .call(d3.axisLeft(y))

  d3.select(".xAxisB")
    .transition()
    .duration(duration)
    .call(d3.axisBottom(x0));



    var barGroups = d3.selectAll(".barG").data(extra);


    barGroups.exit().remove();

    // barGroups.enter().append("g").classed('layer', true)
    //     .attr("transform", function(d) { return "translate(" + x0(d.Instelling + d.Opleiding + d.jaar) + ",0)"; });



    var bars = d3.selectAll(".barG").selectAll("rect")
        .data(keyValue)



    bars.exit().remove();

    // bars.enter().append("rect").attr("width", x1.bandwidth())
    //     .attr("x", function(d) { return x1(d.key); })
    //     .attr("fill", function(d) { return z(d.key); })
    //     .transition().duration(duration)
    //     .attr("y", function(d) { return y(d.value); })
    //     .attr("height", function(d) { return height - y(d.value); });
    //
    // bars
    //     .transition().duration(duration)
    //     .attr("y", function(d) { return y(d.value); })
    //     .attr("height", function(d) { return height - y(d.value); });





      // var bars = d3.selectAll(".test")
      //             .data(data)
      //
      // bars = bars.enter().append("g")
      //         .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; })
      //         .selectAll("rect")
      //         .data(function(d) {
      //             return keys.map(function(key) {
      //                 return {key: key, value: d[key]};
      //             });
      //         })
      // bars = bars
      //   .enter().append("rect")
      //     .attr("width", x1.bandwidth())
      //     .attr("x", function(d) { return x1(d.key); })
      //     .attr("fill", function(d) { return z(d.key); })
      //     .merge(bars)
      //
      // bars.transition()
      //     .duration(750)
      //     .attr("y", function(d) { return y(d.value); })
      //     .attr("height", function(d) { return height - y(d.value); });
      //
      // bars.exit().remove();
    //
    // d3.select(".bar")
    //   .exit()
    //   .remove()


    // change formation of bars
    // d3.selectAll(".barG")
    //   .transition()
    //   .duration(duration)
    //   .attr("transform", function(d,i){return "translate(30,0)"})
        // .data(keyValue)
        // .transition()
        // .duration(duration)
        // .attr("x", function(d) {return x1(d.key);})
        // .attr("y", function(d) {return y(d.value); })
        // .attr("width", x1.bandwidth())
        // .attr("height", function(d) { return height - y(d.value); })
        // .attr("fill", function(d) { return z(d.key); })
        // .attr("transform", "translate(200,0)")


    //
    // d3.selectAll(".barG")
    //   .attr("transform", "translate(200,0)")
  // d3.select("#grid rect")
  //   .style("fill", "blue")

  // d3.select(".doe")
  //   .append('g')
  //   .attr("class", "test")

  //
  // d3.select("#grid g")
  //   .attr("class", "doe")
  //
  //   d3.selectAll(".doe")
  //     .append('g')
  //     .selectAll("g")
  //     .data(extra2)
  //     .enter()
  //     .append("g")
  //     .attr("class", "barG")
  //     .attr("transform", function(d, i) { return "translate(" + x0(d.Instelling + d.Opleiding + d.jaar) + ",0)"; })
  //     .selectAll("rect")
  //     .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
  //     .enter().append("rect")
  //       .transition()
  //       .duration(duration)
  //       .attr("x", function(d) { return x1(d.key); })
  //       .attr("y", function(d) {return y(d.value); })
  //       .attr("width", x1.bandwidth())
  //       .attr("height", function(d) { return height - y(d.value); })
  //       .attr("fill", function(d) { return z(d.key); })
  //       .attr("class", "bar")
  //       .attr("d", function(d){ return d})
  //
  //      keyValue = []
  //
  //      extra.forEach(function(d){
  //        keys.forEach(function(key){
  //          return keyValue.push({key:key, value: d[key]})
  //        })
  //      })
  //






    // change formation of bars
    // d3.selectAll(".barG")
    //     .data(keyValue)
    //     .transition()
    //     .duration(duration)
    //     .attr("x", function(d) {return x1(d.key);})
    //     .attr("y", function(d) {return y(d.value); })
    //     .attr("width", x1.bandwidth())
    //     .attr("height", function(d) { return height - y(d.value); })
    //     .attr("fill", function(d) { return z(d.key); })
    //     .attr('transform', function(d, i) {
    //       if (i === 0 ) {
    //         return "translate(0,0)"
    //       }
    //       else{
    //         return "translate(-2,0)"
    //       }})




        //
        // d3.select(".doe")
        //   .append("g")
        //   .selectAll("g")
        //   .data(extra)
        //   .enter().append("g")
        //     .attr("transform", function(d) {  return "translate(" + 2 * 170 + ",0)"; })
        //   .selectAll("rect")
        //   .data(function(d) {  return keys.map(function(key) { return {key: key, value: d[key]}; }); })
        //   .enter().append("rect")
        //     .transition()
        //     .duration(duration)
        //     .attr("x", function(d) { return x1(d.key); })
        //     .attr("y", function(d) {return y(d.value); })
        //     .attr("width", x1.bandwidth())
        //     .attr("height", function(d) { return height - y(d.value); })
        //     .attr("fill", function(d) { return z(d.key); })
        //     .attr("class", "bar")


}

}
