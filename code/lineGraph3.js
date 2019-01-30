// // Alle margindingen als global variable
// // Set tooltips
var tipLine = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {

              return "<strong>Aantal studenten: </strong><span class='details'>"+ d.y +"</span>";
            })

// svg
var marginLine = {top: 50, right: 40, bottom: 50, left: 50, yPadding: 10}
, widthLine = 570 - marginLine.left - marginLine.right // Use the window's width
, heightLine = 350 - marginLine.top - marginLine.bottom; // Use the window's height

dataset3 = [];

var duration = 800

var legendData = [{id:0, text:"No Data"}, {id:1, text:"No Data"}, {id:2, text:"No Data"}, {id:3, text:"No Data"}];


function lineGraph(instelling,opleiding){

  var title = d3.select("#lineBlock")
                .append("div")
                .attr("class", "row")
                .append("div")
                .attr("class", "col-sm-12")
                .append("h4")
                .text("Lijngrafiek van aanmeldingen eerstejaarstudenten per studie en instelling")
                .append("h3")

                // .text("Hoi")
  makeDropdowns()
  // 1. Add the SVG to the page and employ #2
  var legendDiv = d3.select("#lineBlock")
                    .append("div")
                    .attr("class", "row")
                    .append("div")
                    .attr("id", "legendLine")
                    .attr("class", "col-sm-12")
                    .append("h5")
                    .text("Legenda")

  d3.select("#legendLine")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "80")
      .append("g")
      // .attr("transform", function(d) {return "translate(-100,0)"})
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")


  var svg = d3.select('#lineBlock')
              .append("svg")
              .attr("id", "line")
              .attr("width", widthLine + marginLine.left + marginLine.right)
              .attr("height", heightLine + marginLine.top + marginLine.bottom)
              .append("g")
              .attr("transform", "translate(" + marginLine.left + "," + marginLine.top + ")");

  svg.call(tipLine);

datapoints = []
// get number of datapoints
var keys = Object.keys(allData[0])

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

// var id = 0;
// allData.forEach(function(d){
//     if (d["OPLEIDINGSNAAM ACTUEEL"] === opleiding){
//       if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){
//
//         // get data of all years
//         datapoints.forEach(function(a){
//           var jaar = a;
//           var vrouwen = parseInt((d[`${jaar} VROUW`]));
//           var mannen = parseInt((d[`${jaar} MAN`]));
//
//           // check for double data
//           var duplicate = false;
//           dataset.forEach(function(d, i) {
//             if (d.x === jaar){
//               d.y += (mannen + vrouwen)
//               duplicate = true;
//             }
//           })
//
//           // adds data to dataset
//           if (duplicate === false){
//           coordinates = {};
//           coordinates['x'] = jaar;
//           coordinates['y'] = mannen + vrouwen;
//           dataset.push(coordinates)
//           lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling,
//             x: jaar, y: mannen + vrouwen})
//
//           };
//         })
//
//
//         // lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})
//
//       }
//     }
//   })

  let arr = []
  dataset3.forEach(function(d) {
            d.forEach(function(d){
                arr.push(d.y);
            })
  });
  let min = Math.min(...arr);
  let max = Math.max(...arr);

// 5. X scale
var xScale = d3.scaleLinear()
    .domain([2013,2017]) // input
    .range([0, widthLine]); // output

// 6. Y scale
var yScale = d3.scaleLinear()
    .domain([0, max + marginLine.yPadding]) // input
    .range([heightLine, 0]); // output


// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "xAxisLine")
    .attr("transform", "translate(0," + heightLine + ")")
    .call(d3.axisBottom(xScale))
     // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "yAxisLine")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft


svg.append('g')
   .attr('class', 'linesG')
   .append('g')
   .attr('class', 'lineG')

svg.select(".linesG")
    .append('g')
    .attr("class", "circlesG")



keys = ["Biomedische", "dingen", "nog meer"]


  updateLine("Biomedische Wetenschappen", "Universiteit van Amsterdam");

}

function updateLine (opleiding, instelling){


  datapoints = []
  // get number of datapoints
  var keys = Object.keys(allData[0])

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

  var id = 0;
  var finder = true;

  // vind een ongebruikt id

  // zolang als dat die niet is gevonden, zoek
  while(finder){

    // als dit iD is gebruikt, word ie true
    var idUsed = false;

    // zoek door de data naar de verschillende id's
    lineGraphData.forEach(function(d){

      // als dit iD is gebruikt, word true
      if (d.id === id){
        idUsed = true;
      }
    })

    // als dit id niet is gebruikt, wordt finder false en stop de zoektocht
    if (idUsed === false){
      finder = false
    }
    else {
    id++
    }
  }

  // MAAK EEN if === IS  data = DDD??!!
  if (opleiding === "Alles"){
    uniData.forEach(function(d){
      if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){

        // // get data of all years
        datapoints.forEach(function(a){
          var jaar = a
          var totaal = parseInt((d[`TOTAAL ${jaar}`]));

          coordinates = {};
          coordinates['x'] = jaar;
          coordinates['y'] = totaal
          dataset.push(coordinates)
          lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling,
            x: jaar, y: totaal})


      })
      // lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})



    }})
  }
  allData.forEach(function(d){
      if (d["OPLEIDINGSNAAM ACTUEEL"] === opleiding){
        if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){



            // // get data of all years
            datapoints.forEach(function(a){
              var jaar = a
              var totaal = parseInt((d[`TOTAAL ${jaar}`]));

              coordinates = {};
              coordinates['x'] = jaar;
              coordinates['y'] = totaal
              dataset.push(coordinates)
              lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling,
                x: jaar, y: totaal})
            })
            // lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})
          }
        }
    })


    dataset3.push(dataset)
    var svg = d3.select("#line")
    //   .remove()



    // get mininma and maxima
    let arr = []
    dataset3.forEach(function(d) {
              d.forEach(function(d){
                  arr.push(d.y);
              })

    });
    let min = Math.min(...arr);
    let max = Math.max(...arr);


  var xScale = d3.scaleLinear()
      .domain([2013,2017]) // input
      .range([0, widthLine]); // output

  // 6. Y scale
  var yScale = d3.scaleLinear()
      .domain([0, max + marginLine.yPadding]) // input
      .range([heightLine, 0]); // output

var colorScale = d3.schemeSet2


  // dataset = [{x: 2013, y: 100, x: 2014, y: 120, x: 2015, y: 80, x:2017, y:98},
              // {x: 2013, y: 130, x: 2014, y: 150, x: 2015, y: 100, x:2017, y:120}]
  // 7. d3's line generator
  var line = d3.line()
      .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
      .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
      .curve(d3.curveMonotoneX) // apply smoothing to the line

  // 3. Call the x axis in a group tag
  svg.select(".yAxisLine")
    .transition()
    .duration(duration)
    .call(d3.axisLeft(yScale))


  var lines = svg.select(".lineG").selectAll("path").data(dataset3);

  lines.exit().remove()

  lines
  .transition()
  .duration(duration)
  .attr("d", line)

  var lineColor = "";

  lines.enter()
        .append("path")
        .transition()
        .duration(duration)
        .attr("class", "line")
        .attr("id", function(d, i){ return i})
        .attr("d", function(d){ console.log(d);return line(d)})
        .style("stroke", function(d,i){ lineColor = colorScale[String(i)];
           return colorScale[String(i)]})



  var dotData = [];
  lineGraphData.forEach(function(d){
    // console.log(d)
    coordinates = {};
    coordinates["x"] = d.x;
    coordinates["y"] = d.y;
    dotData.push(coordinates)


  })

  // console.log(dotData)
  // console.log(dataset)
  // console.log(dataset3)
  // console.log(lineGraphData)

console.log(lineGraphData)
  var dotsG = svg.select(".circlesG").selectAll(".dot").data(lineGraphData)

    dotsG
    .enter()
    .append("circle")
    .attr("value", function(d){return [instelling, opleiding]})
    .style("fill", function(d) {return lineColor})
    .attr("class", "dot")
    .attr("r", 4)
    .on("click", function(d){ return updateBarGraph(opleiding, instelling, d.x, "Append")})
    .on("mouseover", function(d){
      return tipLine.show(d);
    })
    .on("mouseout", function(d){ return tipLine.hide();})
    .merge(dotsG)
    .transition()
    .duration(duration)
    .attr("cx", function(d, i) {return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })


  dotsG.exit().remove()

  var legendUpdate = d3.select("#legendLine svg g")
                        .selectAll("g")
                        .data(legendData)
                        .enter()
                        .append("g")
                        .attr("transform", function(d, i) {return "translate(0,"+ i * 20 + ")" })

                        legendUpdate
                        .append("rect")
                        .attr("x", 20)
                        .attr("width", 15)
                        .attr("height", 15)
                        .style("fill",function(d, i){console.log(i);return colorScale[String(i)]})
                        .attr("stroke", function(d, i){return colorScale[String(i)]})
                        .attr("stroke-width",2)
                        .attr("id", function(d, i){return "legendBlock" + i})

                // legendUpdate
                // .append("rect")


                legendUpdate.append("text")
                    .attr("x", 80)
                    .attr("y", 9.5)
                    .attr("dy", "0.32em")
                    .text(function(d) { return d.text; });


}
