// Annemijn Dijkhuis 11149272
// Eindproject Minor programmeren
// Creeert en update een lijngrafiek

// set tooltips
var tipLine = d3.tip()
            .attr("class", "d3-tip")
            .offset([-10, 0])
            .html(function(d) {

              return "<strong>Aantal studenten: </strong><span class='details'>"+ d.y +"</span>";
            });

// svg values
var marginLine = {top: 50, right: 40, bottom: 50, left: 60, yPadding: 10}
, widthLine = 570 - marginLine.left - marginLine.right
, heightLine = 350 - marginLine.top - marginLine.bottom;

var duration = 800;

function lineGraph(){
// maakt een lijn grafiek.

  var header = d3.select("#lineBlock")
                .append("div")
                .attr("class", "row")
                .append("div")
                .attr("class", "col-sm-12")
                .append("h4")
                .text("Lijngrafiek van aanmeldingen eerstejaarstudenten per studie en instelling")
                .append("h3");

  makeDropdowns();

  // maak legenda
  var legendDiv = d3.select("#lineBlock")
                    .append("div")
                    .attr("class", "row");

  legendDiv
    .append("div")
    .attr("id", "legendLine")
    .attr("class", "col-sm-12")
    .append("h5")
    .text("Legenda (Instelling, Opleiding)");


  d3.select("#legendLine")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "80")
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end");

  // maak SVG
  var svg = d3.select("#lineBlock")
              .append("svg")
              .attr("id", "line")
              .attr("width", widthLine + marginLine.left + marginLine.right)
              .attr("height", heightLine + marginLine.top + marginLine.bottom)
              .append("g")
              .attr("transform", "translate(" + marginLine.left + "," + marginLine.top + ")");

  // maak grafiektitel
  var title = d3.select("#line")
                .append("text")
                .text("Aantal eerstejaarsaanmeldingen in het WO voor verschillende opleidingen tussen 2013-2017")
                .attr("x", function() {return widthLine/8})
                .attr("y", function() {return marginLine.top/2})
                .style("font-size", "12px");

  svg.call(tipLine);

  // zodat later data kan worden toegevoegd, vindt dit de hoeveelheid datapunten
  datapoints = [];
  var keys = Object.keys(allData[0])

  keys.forEach(function(d){
    var splitd = d.split(" ", d.length);
    var year = parseInt(splitd[0]);
    if (isNaN(year) === false){
      if (datapoints.includes(year) === false){
      datapoints.push(year);
      }
    }
  });


  var n = datapoints.length;

  dataset = [];

  // vind de minima en maxima
  var arr = []
  lineGraphData.forEach(function(d) {
    d["data"].forEach(function(d){
            arr.push(d.y);
          })
            });

  var min = Math.min(...arr);
  var max = Math.max(...arr);

  // x schaal voor de x-as
  var xScale = d3.scaleTime()
      .domain([firstYear,lastYear])
      .range([0, widthLine]);

  // y schaal voor de y-as
  var yScale = d3.scaleLinear()
      .domain([0, max + marginLine.yPadding])
      .range([heightLine, 0]);


  // maak x as
  svg.append("g")
      .attr("class", "xAxisLine")
      .attr("transform", "translate(0," + heightLine + ")")
      .call(d3.axisBottom(xScale)
       .tickFormat(d3.format("d")));

  // maak y as
  svg.append("g")
      .attr("class", "yAxisLine")
      .call(d3.axisLeft(yScale));


  // text label voor de y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -marginLine.left - 10 )
      .attr("x",0 - (heightLine / 2))
      .attr("dy", "2em")
      .style("text-anchor", "middle")
      .text("Aantal studenten");

  // text label voor de x as
  svg.append("text")
      .attr("y", heightLine + 5)
      .attr("x", widthLine/2)
      .attr("dy", "2em")
      .style("text-anchor", "middle")
      .text("Tijd (jaren)");

  svg.append("g")
     .attr("class", "linesG")
     .append("g")
     .attr("class", "lineG");

  svg.select(".linesG")
      .append("g")
      .attr("class", "circlesG");

    // maakte default lijngrafiek
    updateLine("Biomedische Wetenschappen", "Universiteit van Amsterdam", "Append");

}

function updateLine (opleiding, instelling, type){
  // update de lijngrafiek. Returnt 0 als er geen grafiek kon worden gemaakt.

  // zorgt dat alert altijd wordt verborgen
  $(".alert").hide();

  // vind het aantal datapunten op een dynamische manier
  datapoints = [];

  // vind alle keys
  var keys = Object.keys(allData[0]);

  keys.forEach(function(d){
    var splitd = d.split(" ", d.length);
    var year = parseInt(splitd[0]);
    if (isNaN(year) === false){
      if (datapoints.includes(year) === false){
      datapoints.push(year);
      }
    }
  })

  var n = datapoints.length;

  // vind een ongebruikt id in de grote dataset
  var id = 0;
  var finder = true;

  // zolang als dat dit niet is gevonden, zoek
  while(finder){

    // als dit iD is gebruikt, wordt dit true
    var idUsed = false;

    // zoek door de data naar de verschillende id"s
    lineGraphData.forEach(function(d){

      // als dit iD is gebruikt, word true
      if (d.id === id){
        idUsed = true;
      }
    })

    // als dit id niet is gebruikt, wordt finder false en stop de zoektocht
    if (idUsed === false){
      finder = false;
    }
    else {
    id++;
    }
  };

  // vind de juiste data

  // als dataset "alles" is aangekruisd:
  if (opleiding === "Alles"){
    uniData.forEach(function(d){
      if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){

        var  dataset = [];

        // krijg de data voor alle jaren
        datapoints.forEach(function(a){
          var jaar = a;
          var totaal = parseInt((d[`TOTAAL ${jaar}`]));

          coordinates = {};
          coordinates["x"] = jaar;
          coordinates["y"] = totaal;
          dataset.push(coordinates);
        });


        // checkt of de data wel mag worden gebruikt
        for (var i = 0; i < lineGraphData.length; i++){
          if (opleiding === lineGraphData[i]["Opleiding"]){
            if (instelling === lineGraphData[i]["Instelling"]){
              if (type === "Delete"){

                // verwijdert data uit de database
                lineGraphData.splice(i, 1);
              }
              else{

                // de data is al aangeklikt
                return 0;
              };
            };
          };
        };

        // checkt of er niet teveel data-elementen aanwezig zijn.
        if (type === "Append"){
          if (lineGraphData.length > 3){
            $("#alert").text(message);
            $(".alert").show();
            return 0;
          }
          else{
          lineGraphData.push({id: id, Opleiding: opleiding,
            Instelling: instelling, data:dataset});
          };
        };
      };
    });
  }

  else{

    // als een opleiding is aangekruisd:
    allData.forEach(function(d){
      if (d["OPLEIDINGSNAAM ACTUEEL"] === opleiding){
        if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){


            var dataset = [];

            // krijg de data voor alle jaren
            datapoints.forEach(function(a){
              var jaar = a;
              var totaal = parseInt((d[`TOTAAL ${jaar}`]));

              // maak cooridinaten
              coordinates = {};
              coordinates["x"] = jaar;
              coordinates["y"] = totaal;
              dataset.push(coordinates);

            });

            // controleer de bedoeling van de gebruiker
            for (var i = 0; i < lineGraphData.length; i++){
              if (opleiding === lineGraphData[i]["Opleiding"]){
                if (instelling === lineGraphData[i]["Instelling"]){
                  if (type === "Delete"){
                  lineGraphData.splice(i, 1);
                  }
                  else{
                    return 0;
                  };
                }
              }
            };

          // controleer of de data mág worden toegevoegd
          if (type === "Append"){
            if (lineGraphData.length > 3){

              // maak een alert dat de gebruiker een datapunt moet verwijderen
              $("#alert").text(message);
              $(".alert").show();
              return 0;
            }
            else{
            lineGraphData.push({id: id, Opleiding: opleiding,
              Instelling: instelling, data:dataset});
            }
          };
        };
      };
    });
  }

  var dotData = [];
  var lineData = [];

  lineGraphData.forEach(function(d){
    lineData.push(d.data)

    d.data.forEach(function(d){
        coordinates = {};
        coordinates["x"] = d.x;
        coordinates["y"] = d.y;
        dotData.push(coordinates)
      })
  })


  // define SVG
  var svg = d3.select("#line")

  // get mininma and maxima
  var arr = []
  lineData.forEach(function(d) {
    d.forEach(function(d){
            arr.push(d.y);
          })
            });

  var min = Math.min(...arr);
  var max = Math.max(...arr);


  // update xScale
  var xScale = d3.scaleLinear()
      .domain([2013,2017])
      .range([0, widthLine]);

  // update yScale
  var yScale = d3.scaleLinear()
      .domain([0, max + marginLine.yPadding]) // input
      .range([heightLine, 0]); // output

  // set colorscale
  var colorScale = d3.schemeSet2

  // set line
  var line = d3.line()
      .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
      .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
      .curve(d3.curveMonotoneX) // apply smoothing to the line

  // update y axis
  svg.select(".yAxisLine")
    .transition()
    .duration(duration)
    .call(d3.axisLeft(yScale))

  // exit lines
  var lines = svg.select(".lineG").selectAll("path").data(lineData);

  lines
    .exit()
    .remove()

  // update lines
  lines
    .transition()
    .duration(duration)
    .attr("d", line)

  // geeft de lijn kleur aan voor de dots
  var lineColor = "";

  // enter lines
  lines
    .enter()
    .append("path")
    .transition()
    .duration(duration)
    .attr("class", "line")
    .attr("id", function(d, i){ return i})
    .attr("d", function(d){ return line(d)})
    .style("stroke", function(d,i){ lineColor = colorScale[String(i)];
       return colorScale[String(i)]})

  // enter, update en exit dots
  var dotsG = svg.select(".circlesG").selectAll(".dot").data(dotData);

  dotsG
    .enter()
    .append("circle")
    .attr("id", id)
    .attr("value", function(d){return [instelling, opleiding]})
    .style("fill", function(d) {return lineColor})
    .attr("class", "dot")
    .attr("r", 4)
    .on("click", function(d){
      console.log(id);
      return updateBarGraph(opleiding, instelling, d.x, "Append")})
    .on("mouseover", function(d){
      return tipLine.show(d);
    })
    .on("mouseout", function(d){ return tipLine.hide();})
    .merge(dotsG)
    .transition()
    .duration(duration)
    .attr("cx", function(d, i) {return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })


  dotsG
    .exit()
    .remove()

  // enter, update en remove legenda
  var legendUpdate = d3.select("#legendLine svg g")
                        .selectAll("g")
                        .data(lineGraphData);

  legendUpdate
    .selectAll("g")
    .attr("transform", function(d, i) {return "translate(0,"+ i * 20 + ")" })

  legendUpdate
    .enter()
    .append("g")
    .attr("fill", function(d, i){return colorScale[String(i)]})
    .attr("stroke", function(d, i){return colorScale[String(i)]})
    .attr("stroke-width",2)
    .attr("class", "legendRect")
    .attr("id", function(d, i){return "legendBlock" + i})
    .on("click", function(d){

            return updateLine(d.Opleiding, d.Instelling, "Delete")})
    .attr("transform", function(d, i) {return "translate(0,"+ i * 20 + ")" })
    .append("rect")
    .attr("x", 20)
    .attr("width", 15)
    .attr("height", 15)

  legendUpdate
    .exit()
    .remove()

  d3.selectAll(".legendtext").remove()

  d3.select("#legendLine svg")
    .append("g")
    .attr("class", "legendtextG")
    .selectAll("text")
    .data(lineGraphData)
    .enter()
    .append("text")
    .attr("class", "legendtext")
    .attr("transform", function(d,i) {return "translate(0,"+ i * 20 + ")" })
    .attr("x", 40)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .style("font-size", "10px")
    .text(function(d) { return`${d.Instelling}, ${d.Opleiding}` });


}
