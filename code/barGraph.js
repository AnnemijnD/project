
function barGraph(){


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

  var svg = d3.select("#graph1 svg")
              .attr("width", 1100)
              .attr("height", 300)

      margin = {top: 20, right: 100, bottom: 30, left: 40}
      width = +svg.attr("width") - margin.left - margin.right
      height = +svg.attr("height") - margin.top - margin.bottom
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");




  // The scale spacing the groups:
  var x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

  // The scale for spacing each group's bar:
  var x1 = d3.scaleBand()
      .padding(0.05);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888"]);


  var keys = ["Vrouw", "Man", "Totaal"]
  updateBarGraph("Biomedische Wetenschappen", "Universiteit van Amsterdam", "2016", "Append")



  x0.domain(barGraphData.map(function(d) { return `${d.Opleiding}, ${d.Instelling} ${d.jaar}`; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(barGraphData, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  // g.select(".axis")
  //   .selectAll("text")
  //   .append("rect")


  g.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Population");

  var legend = svg.append("g")
      .attr("transform", function(d) {return "translate(20,0)"})
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice())
    .enter().append("g")
      .attr("transform", function(d, i) { console.log(d); return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width + margin.right)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", z)
      .attr("stroke", z)
      .attr("stroke-width",2)

  legend.append("text")
      .attr("x", width + margin.right - 7)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

  // legend = svg.append("g")
  //   .attr("class","legend")
  //   .attr("transform","translate(50,30)")
  //   .style("font-size","12px")
  //   .call(d3.legend(keys))
  //
  //
  //   setTimeout(function() {
  //   legend
  //     .style("font-size","20px")
  //     .attr("data-style-padding",10)
  //     .call(d3.legend(keys))
  // },1000)




}

  function updateBarGraph(opleiding, instelling, jaar, type) {

    // Set tooltips
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                  return "<strong>" + d.key + "</strong><span class='details'>" +
                  "<br></span>" +

                  "Aantal studenten: <span class='details'>" +
                  d.value+"</span>" + "<br>"+
                  "Klik om te verwijderen";
                })

    var svg = d3.select("#graph1 svg")
                // .attr("width", 800)
                // .attr("height", 300)

    svg.call(tip);



      if (opleiding === "Alles"){

        uniData.forEach(function(d){
          if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){
          var vrouwen = parseInt((d[`${jaar} VROUW`]));
          var mannen = parseInt((d[`${jaar} MAN`]));
          var totaal = parseInt((d[`TOTAAL ${jaar}`]));

          if (type === "Append"){
          barGraphData.push({Instelling: instelling, Opleiding: opleiding,
            jaar:jaar, Man: mannen, Vrouw: vrouwen, Totaal: totaal})
          }

          else {
            var i;
            for (i = 0; i < barGraphData.length; i++) {
              if (barGraphData[i]["Instelling"] === instelling){
                if (barGraphData[i]["Opleiding"] === opleiding){
                  if (barGraphData[i]["jaar"] === jaar){
                    barGraphData.splice(i, 1)
                  }
                }
              }

            }
          }
          }
        })
      }

      else{
      allData.forEach(function(d){

          if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){

            if (d["OPLEIDINGSNAAM ACTUEEL"] === opleiding){


                var vrouwen = parseInt((d[`${jaar} VROUW`]));
                var mannen = parseInt((d[`${jaar} MAN`]));
                var totaal = mannen + vrouwen

                if (type === "Append"){
                barGraphData.push({Instelling: instelling, Opleiding: opleiding,
                  jaar:jaar, Man: mannen, Vrouw: vrouwen, Totaal: totaal})
                }
                else {
                  var i;
                  for (i = 0; i < barGraphData.length; i++) {
                    if (barGraphData[i]["Instelling"] === instelling){
                      if (barGraphData[i]["Opleiding"] === opleiding){
                        if (barGraphData[i]["jaar"] === jaar){
                          barGraphData.splice(i, 1)
                        }
                      }
                    }

                  }
                }





            }
          }
      })
    }



    var data = barGraphData

    var svg = d3.select("#graph1 svg")

    // state the height
    margin = {top: 20, right: 100, bottom: 30, left: 40}
    width = +svg.attr("width") - margin.left - margin.right
    height = +svg.attr("height") - margin.top - margin.bottom

    // get the keys that are needed to get the data
    var keys = ["Vrouw", "Man", "Totaal"]

    // make scales for the axes
    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);


    var z = d3.scaleOrdinal()
              .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    x0.domain(data.map(function(d) { return `${d.Opleiding}, ${d.Instelling} ${d.jaar}`; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

    // update the x axis
    d3.select(".axis")
      .transition()
      .duration(500)
      .call(d3.axisBottom(x0));

    // update the y axis
    d3.select(".y")
    .transition()
    .call(d3.axisLeft(y).ticks(null, "s"))
    .duration(500);

    var dataKeys = []

     data.forEach(function(d){
       return keys.map(function(key) {
          return dataKeys.push({key: key, value: d[key]})
        })
      });

    // remove necessary groups
    var groups = svg.selectAll(".bar").data(data)

    groups.exit().remove()
    ellipseX = 100
    ellipseY = 70
    // update the groups
    groups
    .transition()
    .duration(100)
    .attr("transform", function(d) { return "translate(" + x0(`${d.Opleiding}, ${d.Instelling} ${d.jaar}`) + ")"; })

    // update the newly inserted groups
    d3.selectAll("#extra")
    .transition()
    .duration(100)
    .attr("transform", function(d) { return "translate(" + (x0(`${d.Opleiding}, ${d.Instelling} ${d.jaar}`) + margin.left) + "," + margin.top + ")"; })


    // enter the new groups and rectangles
    groups.enter().append("g")
    .attr("class","bar")
    .attr("id", "extra")
    .attr("transform", function(d) { return "translate(" + (x0(`${d.Opleiding}, ${d.Instelling} ${d.jaar}`) + margin.left)  + "," + margin.top + ")"; })
    .on("click",function(d) {
                      updateBarGraph(d.Opleiding,
                                      d.Instelling, d.jaar, "Delete")})
    .selectAll("rect")

    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .on("mouseover", function(d){

        tip.show(d);
      })
      .on("mouseout", function(d){
        tip.hide(d);
      })
      .on("click", function(d){
        tip.hide(d);
      })
      .attr("y", function(d) { return y(0); })
      .attr("height", "0")
      .attr("width", x1.bandwidth())
      .transition()
      .duration(100)
      .attr("y", function(d){
            return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); })
      .attr("x", function(d) {
        return x1(d.key); })

    // check bar data
    var bars = svg.selectAll(".bar").selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })

    // Adjust the remaining bars:
    //
    bars
      .transition()
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("fill", function(d) { return z(d.key); })
      .duration(500);

  }
