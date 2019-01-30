// Annemijn Dijkhuis 11149272
// Eindproject Minor programmeren
// Creeert en update  een kaart van Nederland

// fix get max!
MINALL = 0;
MAXALL = 8115;
var tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-10, 0])
            .html(function(d) {

              // alle instellingen worden benoemd in tooltip
              var instellingen = "";
              d["INSTELLINGEN"].forEach(function(a){
                instellingen += "<strong>"
                instellingen += (`${a["INSTELLINGSNAAM ACTUEEL"]}: </strong>`)
                instellingen += "<span class='details'>"
                instellingen += `${a["TOTAAL INSTELLING"]}`
                instellingen += ("<br></span>")
              });

              if (d["INSTELLINGEN"].length > 1){
                tekst =   "<strong>Totaal: </strong><span class='details'>" +
                  d[`TOTAAL`]+"</span>" + "<br>"

              }
              else{
                tekst = ""
              }
              // stad en totaal aantal studenten in tooltip
              return "<strong>Stad: </strong><span class='details'>" +
               d["GEMEENTENAAM"]+ "<br></span>"  + instellingen + tekst

            })

function createMap(dataMap) {

  var mapwidth = 600/1.5
  var mapheight = 700/1.5
  // set margins
  var margin = {top: 0, right: 0, bottom: 0, left: 0},
              width = 600/1.5- margin.left - margin.right,
              height = 400 - margin.top - margin.bottom;

  // titles
  var header = d3.select("#mapBlock")
              .append("div")
              .attr("class", "row")
              .append("div")
              .attr("class", "col-sm-12")
              .append("h4")
              .attr("text-align","center")
              .text("Aantal aanmeldingen van eerstejaarsstudenten in Nederland")




  d3.select("#mapBlock")
    .append("div")
    .attr("class", "col-sm-2")
    .append("p")
    .attr("id", "value-time")


  d3.select("#mapBlock")
    .append("div")
    .attr("class", "sm")
    .attr("id", "slider-time")


    // Time
    var dataTime = d3.range(0, LASTYEAR - FIRSTYEAR + 1).map(function(d) {
      return new Date(FIRSTYEAR + d, LASTYEAR - FIRSTYEAR, 3);
    });

    // var dataTime2 = d3.range(l)

    var sliderTime = d3
      .sliderBottom()
      .min(d3.min(dataTime))
      .max(d3.max(dataTime))
      .step(1000 * 60 * 60 * 24 * 365)
      .width(300)
      .tickFormat(d3.timeFormat("%Y"))
      .tickValues(dataTime)
      .default(new Date(2017, 10, 3))
      .on("onchange", val => {
        updateMap(d3.timeFormat("%Y")(val))
      })

    var gTime = d3
      .select("div#slider-time")
      .append("svg")
      .attr("width", 500)
      .attr("height", 100)
      .append("g")
      .attr("transform", "translate(30,30)");

    gTime.call(sliderTime);

    d3.select("p#value-time")
    // .text("Jaar: " + d3.timeFormat("%Y")(sliderTime.value()));



    // make svg
    var svg = d3.select("#mapBlock")
                .append("svg")
                .attr("id", "map")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("viewBox", "0 0 420 400")
                // .append("g")
                // .attr("class", "map")
    var title = d3.select("#map")
                  .append("text")
                  .text("Aantal eerstejaarsaanmeldingen in het WO per jaar per stad")
                  .attr("x", function() {return width/10})
                  .attr("y", function() {return 10})



  var path = d3.geoPath();


  var projection = d3.geoMercator()
                    .center([ 5, 52 ])
                    .translate([ mapwidth/3, mapheight/2])
                    .scale([ mapwidth*12]);


  var path = d3.geoPath().projection(projection);

  svg.call(tip);
  // fill map with the right color
  d3.select("#map")
  .append("g")
  .attr("class", "provincies")
  .selectAll("path")
  .data(dataMap.features)
  .enter().append("path")
  .attr("d", path)
  .attr("class", "mapPath")
  .style("fill", function(d) {
                                    return "#4D80B3"

                                })
  .style("opacity",0.8)
  .style("position", "relative")
  .style("z-index", "-1")

  // tooltips
  .style("stroke","white")
  .style("stroke-width", 0.3)
  .on("mouseover",function(d){
    if ((isNaN(d.total)) === false){
        tip.show(d);

      d3.select(this)
        .style("opacity", 1)
        .style("stroke","white")
        .style("stroke-width",3);
      }
  })
  .on("mouseout", function(d){
    if ((isNaN(d.total)) === false){
      tip.hide(d);
      d3.select(this)
        .style("opacity", 0.8)
        .style("stroke","white")
        .style("stroke-width",0);
      }
  })

  updateMap("2017")


  var MINALL = 0;
  var MAXALL = 8115;

    // width and height of legendbar
    var w = 300, h = 50;

    // set legendsvg
    var key = d3.select("#map")
       .append("svg")
       .attr("height", 200)
       .attr("width", w + 10)
       .attr("x", 10)
       .attr("y", 350);

   // set color scale
   var color = d3.scaleLinear()
       .domain([0,MAXALL])
       .range([255,0]);

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
       .attr("stop-color", "rgb("+ color(MINALL) + ",0," + -(color(MINALL) - 255) +")")
       .attr("stop-opacity", 0.8);

     legend.append("stop")
       .attr("offset", "33%")
       .attr("stop-color", "rgb("+ color(MAXALL*0.33) + ",0," + -(color(MAXALL*0.33) - 255) +")")
       .attr("stop-opacity", 0.8);

     legend.append("stop")
       .attr("offset", "66%")
       .attr("stop-color", "rgb("+ color(MAXALL*0.66) + ",0," + -(color(MAXALL*0.66) - 255) +")")
       .attr("stop-opacity", 0.8);

     legend.append("stop")
       .attr("offset", "100%")
       .attr("stop-color", "rgb("+ color(MAXALL) + ",0," + -(color(MAXALL) - 255) +")")
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
        .text(MAXALL)
        .style("font-size", "10px");

     // Title legend
     key.append("text")
     .attr("x", 0)
     .attr("y", 10)
     .text("Aantal studenten")
     .style("font-size", "10px");


    // set standard bargraph to the Netherlands

    // var dropdowns = makeDropdowns(ALLDATA)

    // var samsBarvar = samsBar()
}

function updateMap(jaartal){


  var svg = d3.select("#map")

    var maxStudenten = 0;
    GEODATA.forEach(function(geo){
      geo["INSTELLINGEN"] = [];
      var totaalStudenten = 0;


      UNIDATA.forEach(function(d){
        if (d["GEMEENTENAAM"] === geo["GEMEENTENAAM"]){
          totaalStudenten += d[`TOTAAL ${jaartal}`];
          instellingenDict = {"INSTELLINGSNAAM ACTUEEL": d["INSTELLINGSNAAM ACTUEEL"],
                              "TOTAAL INSTELLING": d[`TOTAAL ${jaartal}`]};
          geo["INSTELLINGEN"].push(instellingenDict);
        }

      if (maxStudenten < totaalStudenten){
        maxStudenten = totaalStudenten;
      }
      geo["TOTAAL"] = totaalStudenten;
      })
    })

    // find minima and maxima
    var arr = []
        Object.values(GEODATA).forEach(function(d) {
                arr.push(d[`TOTAAL`]);

    });

    var min = 0;
    var max = 8155;


    // set color scale
    var color = d3.scaleLinear()
        .domain([0,max])
        .range([255,0]);

    var dotSize = d3.scaleLinear()
                    .domain([0,max])
                    .range([2,20]);


    var circle = svg.selectAll("circle")
                      // .enter()
                      .data(GEODATA)


    //
    // circle.exit().remove();

      // circle.transition().duration()

      circle
      .enter()
      .append("circle")
      .on("mouseover",function(d){

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
      .on("mouseout", function(d){
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

      })
      .on("click", function(d){

          d["INSTELLINGEN"].forEach(function(d){
            instelling = d["INSTELLINGSNAAM ACTUEEL"]
            console.log(instelling)
            updateLine("Alles", instelling, "Append")
            updateBarGraph("Alles", instelling, jaartal, "Append")
          })
      })
      // .transition()
      .attr("cx", function(d) {
        return circleXScale(d.X);
      })
      .attr("cy", function(d) {
        return circleYScale(d.Y);
      })
      .attr("id", function(d){
              return d["GEMEENTENAAM"]
      })

      .attr("r", function(d){
        return  dotSize(d[`TOTAAL`]);
      })
      .attr("class", "circle")
      .style("position", "relative")
      .style("z-index", "1000")
      // .style("fill", function(d) {
      //                               return "rgb("+ color(d[`TOTAAL`]) + ",0," + -(color(d[`TOTAAL`]) - 255) +")"
      //                             })
      .style("fill", function(d){
        if ((jaartal % 2) === 0){
          return "black"
        }
        else{
            return "rgb("+ color(d[`TOTAAL`]) + ",0," + -(color(d[`TOTAAL`]) - 255) +")"
        }
      })

      // look at existing circles
      circle
      .transition()
      .duration(500)
      .attr("r", function(d){
        return  dotSize(d[`TOTAAL`]);
      })
     .style("fill", function(d){

          return "rgb("+ color(d[`TOTAAL`]) + ",0," + -(color(d[`TOTAAL`]) - 255) +")"
        })





};


function circleXScale(x) {

  var scaled = (((5.6970977783203125 - x) / (0.00920278999983715))/1.5) * (12/10)

  return (375/1.5 * (12/10) - scaled - 110)
}

function circleYScale(y){
  var scaled = (((50.8506076217602 - y) / (0.005925835076440901))/1.5) * (12/10)

  return (543/1.5) * (12/10) + scaled - 40

}
