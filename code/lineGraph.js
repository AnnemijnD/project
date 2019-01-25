function lineGraph(instelling, opleiding){

  dataStud = allData

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

var id = 0;
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

        lineGraphData.push({id: id, Opleiding: opleiding, Instelling: instelling})

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
    .attr("id", id)
   // 11. Calls the line generator // Assign a class for styling
    .attr("d", line);



// 12. Appends a circle for each datapoint
svg.selectAll(".dot")

    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
  .attr("id", id)
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

        jaar = d.x
        id = this.id

        lineGraphData.forEach(function(d){

          if (parseInt(id) === parseInt(d.id)){
            opleiding = d.Opleiding
            instelling = d.Instelling
          }
        })




        return updateBarGraph(opleiding, instelling, `${d.x}`)});
}

function updateLine (opleiding, instelling){



  dataStud = allData



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

  var id = 0;

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
    }})
  }
  dataStud.forEach(function(d){
      if (d["OPLEIDINGSNAAM ACTUEEL"].includes(opleiding)){
        if (d["INSTELLINGSNAAM ACTUEEL"].includes(instelling)){


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
      .attr("id", id)
      .datum(dataset) // 10. Binds data to the line
      .transition()
      .duration(duration)
      .attr("d", function(d) { return line(d); })


  // 12. Appends a circle for each datapoint
  d3.selectAll(".dot")
      .attr("id", id)
      .data(dataset)
      .transition()
      .duration(duration)
      .attr("cx", function(d, i) { return xScale(d.x) })
      .attr("cy", function(d) { return yScale(d.y) })
      .attr("value", function(d){return [instelling, opleiding]})


}
