// // Alle margindingen als global variable
// // Set tooltips
var tipLine = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {

              return "<strong>Aantal studenten: </strong><span class='details'>"+ d.y +"</span>";
            })

// svg
var marginLine = {top: 50, right: 50, bottom: 50, left: 50, yPadding: 10}
, widthLine = 500 - marginLine.left - marginLine.right // Use the window's width
, heightLine = 350 - marginLine.top - marginLine.bottom; // Use the window's height



var duration = 800
function lineGraph(instelling, opleiding){

  dataset2 = [[{x: 2013, y: 100}, {x: 2014, y: 120}, {x: 2015, y: 80}, {x:2017, y:150}],
              [{x: 2013, y: 130}, {x: 2014, y: 150}, {x: 2015, y: 100}, {x:2017, y:120}]]


  // 1. Add the SVG to the page and employ #2
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

var id = 0;
allData.forEach(function(d){
    if (d["OPLEIDINGSNAAM ACTUEEL"] === opleiding){
      if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){

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

        lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})

      }
    }
  })


  let arr = []
  dataset2.forEach(function(d) {
            console.log(d)
            d.forEach(function(d){
              console.log(d)
                arr.push(d.y);
            })

  });
  let min = Math.min(...arr);
  let max = Math.max(...arr);


  // var max = 50;
  // dataset = [[{x: 2013, y: 100}, {x: 2014, y: 120}, {x: 2015, y: 80}, {x:2017, y:98}],
  //             [{x: 2013, y: 130}, {x: 2014, y: 150}, {x: 2015, y: 100}, {x:2017, y:120}]]
// 5. X scale
var xScale = d3.scaleLinear()
    .domain([2013,2017]) // input
    .range([0, widthLine]); // output

// 6. Y scale
var yScale = d3.scaleLinear()
    .domain([0, max + marginLine.yPadding]) // input
    .range([heightLine, 0]); // output

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
    .curve(d3.curveMonotoneX) // apply smoothing to the line



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

// //9. Append the path, bind the data, and call the line generator
// svg.append("path")
//     .datum(dataset) // 10. Binds data to the line
//     .attr("class", "line")
//     .attr("id", id)
//    // 11. Calls the line generator // Assign a class for styling
//     .attr("d", line);

    // max = 150;


    var line = d3.line()
              .x(function(d) {return xScale(d.x); }) // set the x values for the line generator
              .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
              .curve(d3.curveMonotoneX); // apply smoothing to the line

    var lines = svg.append('g')
                   .attr('class', 'linesG')
                   .append('g')
                   .attr('class', 'lineG')
    var circles = svg.select(".lines")
          .append('g')
          .attr("class", "circleG")


    // for (var i = 0; i < dataset2.length; i++){

                      lines
                      .selectAll("path")
                     .data(dataset2)
                     .enter()
                         .append('path')
                         .attr('class', 'line')
                         .attr("id", function(d, i){ return i})
                         .attr("d", function(d) {return line(d)}) // 11. Calls the line generator




            circles
           .selectAll(".dot")
           .data(dataset2)
           .enter()
           // .data(function(d){return d})
              .append("circle") // Uses the enter().append() method
              .attr("class", "dot") // Assign a class for styling
              .attr("id", function(i){ return i})

              .attr("cx", function(d) {
                return xScale(d.x)})
               .attr("cy", function(d) { return yScale(d.y) })
               .attr("r", 5)
               .on("mouseover", function(d) {
                 d3.select(this)
                 .style("fill", "#000000")
                 tipLine.show(d)
               })
               .on("mouseout", function() {
                  d3.select(this)
                  .style("fill", "#ffab00")
                  tipLine.hide()
               })

    // dataset.forEach(function(d){
      //
      // svg.append("path")
      //     .datum(dataset) // 10. Binds data to the line
      //     .attr("class", "line")
      //     // .attr("id", id)
      //    // 11. Calls the line generator // Assign a class for styling
      //     .attr("d", line);
      //
      //     // })

    //
    //
    // // 12. Appends a circle for each datapoint
    //
    // svg.selectAll(".dot")
    //     .data(dataset)
    //     .enter()
    //     .append("circle")
    //     .attr("id", id)
    //     // .attr("cx", function(d, i) { return xScale(d.x) })
    //     // .attr("cy", function(d) { return yScale(d.y) })
    //     // .attr("value", function(d){return [instelling, opleiding]})
    //     .attr("class", "dot") // Assign a class for styling
    //     .attr("cx", function(d, i) { return xScale(d.x) })
    //     .attr("cy", function(d) { return yScale(d.y) })
    //     .attr("r", 5)
    //     .attr("value", function(d){return [instelling, opleiding]})
    //       .on("mouseover", function(d) {
    //
    //         tip.show(d)
    // 		})
    //       .on("mouseout", function(d) { tip.hide(d) })
    //       .on("click", function(d) {
    //
    //         jaar = d.x
    //         id = this.id
    //
    //         lineGraphData.forEach(function(d){
    //
    //           if (parseInt(id) === parseInt(d.id)){
    //             opleiding = d.Opleiding
    //             instelling = d.Instelling
    //             clicked("bargraph", instelling, opleiding, jaar, id)
    //           }
    //         })
    //
    //       })



// keys = ["x", "y"]
// // 12. Appends a circle for each datapoint
// svg.selectAll(".lineG").data(dataset)
//   .enter().append("g")
//     .attr("class", "lineG")
//     .selectAll(".dot")
//     .data(function(d){ return keys.map(function(key) { console.log(d);return {key: key, value: d[key]}; }); })
//   .enter().append("circle") // Uses the enter().append() method
//   .attr("id", id)
//     .attr("class", "dot") // Assign a class for styling
//     .attr("cx", function(d, i) { return xScale(d.key) })
//     .attr("cy", function(d) { return yScale(d.value) })
//     .attr("r", 5)
//     .attr("value", function(d){return [instelling, opleiding]})
//       .on("mouseover", function(d) {
//
//         tip.show(d)
// 		})
//       .on("mouseout", function(d) { tip.hide(d) })
//       .on("click", function(d) {
//
//         jaar = d.x
//         id = this.id
//
//         lineGraphData.forEach(function(d){
//
//           if (parseInt(id) === parseInt(d.id)){
//             opleiding = d.Opleiding
//             instelling = d.Instelling
//           }
//         })

}

function updateLine (opleiding, instelling){
  dataset3 = [[{x: 2013, y: 40}, {x: 2014, y: 90}, {x: 2015, y: 50}, {x:2017, y:20}],
              [{x: 2013, y: 140}, {x: 2014, y: 150}, {x: 2015, y: 170}, {x:2017, y:130}]]


    var svg = d3.select("#line")
    //   .remove()

    // // Set tooltips
    // var tip = d3.tip()
    //             .attr('class', 'd3-tip')
    //             .offset([-10, 0])
    //             .html(function(d) {
    //
    //               return "<strong>Aantal studenten: </strong><span class='details'>"+ d.y +"</span>";
    //             })


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


      })

        lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})
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
            })
            lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})
          }
        }
    })
    console.log(lineGraphData)
    // get mininma and maxima
    let arr = []
    dataset3.forEach(function(d) {
              console.log(d)
              d.forEach(function(d){
                console.log(d)
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


  var lines = svg.select(".linesG").selectAll("path").data(dataset);

  lines.exit().remove()

  lines.enter()
        .append("path")
        .transition()
        .attr("class", "line")
        .attr("id", function(d, i){ return i})
        .attr("d", line)


//
//   for (var i = 0; i < dataset.length; i++){
//   // lineGraphData.forEach(function(d){
//
//
//     // var line = d3.select(".line")
//     //     .datum(dataset3[i]) // 10. Binds data to the line
//     //     .transition()
//     //     .attr("class", "line")
//     //     .attr("id", id)
//     //    // 11. Calls the line generator // Assign a class for styling
//     //     .attr("d", function(d){ return line});
//         // })
//
//
//   // 12. Appends a circle for each datapoint
//   d3.selectAll(".dot")
//       .attr("id", id)
//       .data(dataset3[i])
//       // .transition()
//       // .duration(duration)
//       .attr("cx", function(d, i) { return xScale(d.x) })
//       .attr("cy", function(d) { return yScale(d.y) })
//       .attr("value", function(d){return [instelling, opleiding]})
//
//
//   }
}

// // Alle margindingen als global variable
// // Set tooltips
// var tip = d3.tip()
//             .attr('class', 'd3-tip')
//             .offset([-10, 0])
//             .html(function(d) {
//
//               return "<strong>Aantal studenten: </strong><span class='details'>"+ d.y +"</span>";
//             })
//
// // svg
// var margin = {top: 50, right: 50, bottom: 50, left: 50, yPadding: 10}
// , width = 500 - marginLine.left - marginLine.right // Use the window's width
// , height = 350 - marginLine.top - marginLine.bottom; // Use the window's height
//
// var duration = 800;
//
// var svg = d3.select("#line")
//
// function lineGraph(instelling, opleiding){
//
//
//
//
//   // d3.select("#line")
//   //   .remove()
//
//   // 1. Add the SVG to the page and employ #2
//   var svg = d3.select('#lineBlock')
//               .append("svg")
//               .attr("id", "line")
//               .attr("width", width + marginLine.left + marginLine.right)
//               .attr("height", height + marginLine.top + marginLine.bottom)
//               .append("g")
//               .attr("transform", "translate(" + marginLine.left + "," + marginLine.top + ")");
//
//
//
// datapoints = []
// // get number of datapoints
// var keys = Object.keys(allData[0])
//
// keys.forEach(function(d){
//   var splitd = d.split(" ", d.length)
//   var year = parseInt(splitd[0])
//   if (isNaN(year) === false){
//     if (datapoints.includes(year) === false){
//     datapoints.push(year)
//     }
//   }
// })
//
//
// var n = datapoints.length;
//
//
// dataset = [];
// // get right dataset
//
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
//
//           };
//         })
//
//         lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})
//
//       }
//     }
//   })
//
//
//   // get mininma and maxima
//   let arr = []
//   Object.values(dataset).forEach(function(d) {
//             arr.push(d.y);
//   });
//   let min = Math.min(...arr);
//   let max = Math.max(...arr);
//
//   // var max = 50;
//   // dataset = [[{x: 2013, y: 100}, {x: 2014, y: 120}, {x: 2015, y: 80}, {x:2017, y:98}],
//   //             [{x: 2013, y: 130}, {x: 2014, y: 150}, {x: 2015, y: 100}, {x:2017, y:120}]]
// // 5. X scale
// var xScale = d3.scaleLinear()
//     .domain([2013,2017]) // input
//     .range([0, width]); // output
//
// // 6. Y scale
// var yScale = d3.scaleLinear()
//     .domain([0, max + marginLine.yPadding]) // input
//     .range([height, 0]); // output
//
// // 7. d3's line generator
// var line = d3.line()
//     .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
//     .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
//     .curve(d3.curveMonotoneX) // apply smoothing to the line
//
//
//
// svg.call(tip);
//
// // 3. Call the x axis in a group tag
// svg.append("g")
//     .attr("class", "xAxis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(xScale))
//      // Create an axis component with d3.axisBottom
//
// // 4. Call the y axis in a group tag
// svg.append("g")
//     .attr("class", "yAxis")
//     .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
//
// // //9. Append the path, bind the data, and call the line generator
// // svg.append("path")
// //     .datum(dataset) // 10. Binds data to the line
// //     .attr("class", "line")
// //     .attr("id", id)
// //    // 11. Calls the line generator // Assign a class for styling
// //     .attr("d", line);
//
//     // max = 150;
//     dataset2 = [[{x: 2013, y: 100}, {x: 2014, y: 120}, {x: 2015, y: 80}, {x:2017, y:150}],
//                 [{x: 2013, y: 130}, {x: 2014, y: 150}, {x: 2015, y: 100}, {x:2017, y:120}]]
//
//     var line = d3.line()
//               .x(function(d) {return xScale(d.x); }) // set the x values for the line generator
//               .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
//               .curve(d3.curveMonotoneX) // apply smoothing to the line
//
//     for (var i = 0; i < dataset2.length; i++){
//       console.log(i)
//
//       var lines = svg.append('g')
//                      .attr('class', 'lines')
//                      .datum(dataset2[i])
//                        .append('g')
//                        .attr('class', 'lineG')
//                          .append('path')
//                          .attr('class', 'line')
//                          .attr("id", i)
//                          .attr("d", line) // 11. Calls the line generator
//
//
//
//
//       svg.select(".lines")
//             .append('g')
//            .attr("class", "circleG")
//            .selectAll(".dot")
//            .data(dataset2[i])
//            .enter()
//            // .data(function(d){return d})
//               .append("circle") // Uses the enter().append() method
//               .attr("class", "dot") // Assign a class for styling
//               .attr("id", i)
//               .attr("cx", function(d) {
//                  console.log(d);
//                 return xScale(d.x)})
//                .attr("cy", function(d) { return yScale(d.y) })
//                .attr("r", 5)
//                .on("mouseover", function(d) {
//                  d3.select(this)
//                  .style("fill", "#000000")
//                  tip.show(d)
//                })
//                .on("mouseout", function() {
//                   d3.select(this)
//                   .style("fill", "#ffab00")
//                   tip.hide()
//                })
//       }
//     // dataset.forEach(function(d){
//       //
//       // svg.append("path")
//       //     .datum(dataset) // 10. Binds data to the line
//       //     .attr("class", "line")
//       //     // .attr("id", id)
//       //    // 11. Calls the line generator // Assign a class for styling
//       //     .attr("d", line);
//       //
//       //     // })
//
//     //
//     //
//     // // 12. Appends a circle for each datapoint
//     //
//     // svg.selectAll(".dot")
//     //     .data(dataset)
//     //     .enter()
//     //     .append("circle")
//     //     .attr("id", id)
//     //     // .attr("cx", function(d, i) { return xScale(d.x) })
//     //     // .attr("cy", function(d) { return yScale(d.y) })
//     //     // .attr("value", function(d){return [instelling, opleiding]})
//     //     .attr("class", "dot") // Assign a class for styling
//     //     .attr("cx", function(d, i) { return xScale(d.x) })
//     //     .attr("cy", function(d) { return yScale(d.y) })
//     //     .attr("r", 5)
//     //     .attr("value", function(d){return [instelling, opleiding]})
//     //       .on("mouseover", function(d) {
//     //
//     //         tip.show(d)
//     // 		})
//     //       .on("mouseout", function(d) { tip.hide(d) })
//     //       .on("click", function(d) {
//     //
//     //         jaar = d.x
//     //         id = this.id
//     //
//     //         lineGraphData.forEach(function(d){
//     //
//     //           if (parseInt(id) === parseInt(d.id)){
//     //             opleiding = d.Opleiding
//     //             instelling = d.Instelling
//     //             clicked("bargraph", instelling, opleiding, jaar, id)
//     //           }
//     //         })
//     //
//     //       })
//
//
//
// // keys = ["x", "y"]
// // // 12. Appends a circle for each datapoint
// // svg.selectAll(".lineG").data(dataset)
// //   .enter().append("g")
// //     .attr("class", "lineG")
// //     .selectAll(".dot")
// //     .data(function(d){ return keys.map(function(key) { console.log(d);return {key: key, value: d[key]}; }); })
// //   .enter().append("circle") // Uses the enter().append() method
// //   .attr("id", id)
// //     .attr("class", "dot") // Assign a class for styling
// //     .attr("cx", function(d, i) { return xScale(d.key) })
// //     .attr("cy", function(d) { return yScale(d.value) })
// //     .attr("r", 5)
// //     .attr("value", function(d){return [instelling, opleiding]})
// //       .on("mouseover", function(d) {
// //
// //         tip.show(d)
// // 		})
// //       .on("mouseout", function(d) { tip.hide(d) })
// //       .on("click", function(d) {
// //
// //         jaar = d.x
// //         id = this.id
// //
// //         lineGraphData.forEach(function(d){
// //
// //           if (parseInt(id) === parseInt(d.id)){
// //             opleiding = d.Opleiding
// //             instelling = d.Instelling
// //           }
// //         })
//
// }
//
// function updateLine (opleiding, instelling){
//
//
//   datapoints = []
//   // get number of datapoints
//   var keys = Object.keys(allData[0])
//
//   keys.forEach(function(d){
//     var splitd = d.split(" ", d.length)
//     var year = parseInt(splitd[0])
//     if (isNaN(year) === false){
//       if (datapoints.includes(year) === false){
//       datapoints.push(year)
//       }
//     }
//   })
//
//
//   var n = datapoints.length;
//
//
//   dataset = [];
//   // get right dataset
//
//   var id = 0;
//   var finder = true;
//
//   // vind een ongebruikt id
//
//   // zolang als dat die niet is gevonden, zoek
//   while(finder){
//
//     // als dit iD is gebruikt, word ie true
//     var idUsed = false;
//
//     // zoek door de data naar de verschillende id's
//     lineGraphData.forEach(function(d){
//
//       // als dit iD is gebruikt, word true
//       if (d.id === id){
//         idUsed = true;
//       }
//     })
//
//     // als dit id niet is gebruikt, wordt finder false en stop de zoektocht
//     if (idUsed === false){
//       finder = false
//     }
//     else {
//     id++
//     }
//   }
//
//   // MAAK EEN if === IS  data = DDD??!!
//   if (opleiding === "Alles"){
//     uniData.forEach(function(d){
//       if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){
//
//         // // get data of all years
//         datapoints.forEach(function(a){
//           var jaar = a
//           var totaal = parseInt((d[`TOTAAL ${jaar}`]));
//
//           coordinates = {};
//           coordinates['x'] = jaar;
//           coordinates['y'] = totaal
//           dataset.push(coordinates)
//
//
//       })
//
//         lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})
//     }})
//   }
//   allData.forEach(function(d){
//       if (d["OPLEIDINGSNAAM ACTUEEL"] === opleiding){
//         if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){
//
//
//
//             // // get data of all years
//             datapoints.forEach(function(a){
//               var jaar = a
//               var totaal = parseInt((d[`TOTAAL ${jaar}`]));
//
//               coordinates = {};
//               coordinates['x'] = jaar;
//               coordinates['y'] = totaal
//               dataset.push(coordinates)
//             })
//             lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})
//           }
//         }
//     })
//
//     // get mininma and maxima
//     let arr = []
//     Object.values(dataset).forEach(function(d) {
//               arr.push(d.y);
//     });
//     let min = Math.min(...arr);
//     let max = Math.max(...arr);
//
//     // var max = 150
//
//   // 5. X scale
//   var xScale = d3.scaleLinear()
//       .domain([2013,2017]) // input
//       .range([0, width]); // output
//
//   // 6. Y scale
//   var yScale = d3.scaleLinear()
//       .domain([0, max + marginLine.yPadding]) // input
//       .range([height, 0]); // output
//
//   // dataset = [{x: 2013, y: 100, x: 2014, y: 120, x: 2015, y: 80, x:2017, y:98},
//               // {x: 2013, y: 130, x: 2014, y: 150, x: 2015, y: 100, x:2017, y:120}]
//   // 7. d3's line generator
//   var line = d3.line()
//       .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
//       .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
//       .curve(d3.curveMonotoneX) // apply smoothing to the line
//
//   // 3. Call the x axis in a group tag
//   svg.select(".yAxis")
//     .transition()
//     .duration(duration)
//     .call(d3.axisLeft(yScale))
//
//   // lineGraphData.forEach(function(d){
//     svg.select(".line")
//
//         .datum(dataset) // 10. Binds data to the line
//         .transition()
//         .attr("class", "line")
//         .attr("id", id)
//        // 11. Calls the line generator // Assign a class for styling
//         .attr("d", line);
//         // })
//
//
//   // 12. Appends a circle for each datapoint
//   svg.selectAll(".dot")
//       .attr("id", id)
//       .data(dataset)
//       .transition()
//       // .duration(duration)
//       .attr("cx", function(d, i) { return xScale(d.x) })
//       .attr("cy", function(d) { return yScale(d.y) })
//       .attr("value", function(d){return [instelling, opleiding]})
//
//
// }
