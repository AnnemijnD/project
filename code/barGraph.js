
function barGraph(){


  // var barGraphData = [{Instelling: "UvA", Opleiding: "bmw", jaar:'2017', Man: 200, Vrouw: 300},
  //       {Instelling: "UvA", Opleiding: "Bmw", jaar:'2016', Man: 150, Vrouw: 200}]

  var svg = d3.select("#graph1 svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
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
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


  var keys = ["Vrouw", "Man", "Totaal"]
  updateBarGraph("Biomedische Wetenschappen", "Universiteit van Amsterdam", "2016")



  x0.domain(barGraphData.map(function(d) { return `${d.Opleiding}, ${d.Instelling} ${d.jaar}`; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(barGraphData, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

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

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 17)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", z)
      .attr("stroke", z)
      .attr("stroke-width",2)
      .on("click",function(d) {
                    updateBarGraph("Biomedische Wetenschappen",
                                    "Universiteit van Amsterdam", "2017")});

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

  var filtered = [];


}

  function updateBarGraph(opleiding, instelling, jaar) {


    allData.forEach(function(d){

        if (d["INSTELLINGSNAAM ACTUEEL"].includes(instelling)){

          if (d["OPLEIDINGSNAAM ACTUEEL"].includes(opleiding)){


              var vrouwen = parseInt((d[`${jaar} VROUW`]));
              var mannen = parseInt((d[`${jaar} MAN`]));
              var totaal = mannen + vrouwen
              // console.log(vrouwen + mannen)

              barGraphData.push({Instelling: instelling, Opleiding: opleiding,
                jaar:jaar, Man: mannen, Vrouw: vrouwen, Totaal: totaal});

          }
        }
    })


    var data = barGraphData

    var svg = d3.select("#graph1 svg")

    // state the height
    margin = {top: 20, right: 20, bottom: 30, left: 40}
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

    // console.log("Max:")
    // console.log(d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); }))
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

    // remove necessary groups
    var groups = svg.selectAll(".bar").data(data)

    groups.exit().remove()

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
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("y", function(d) { return y(0); })
      .attr("height", "0")
      .attr("width", x1.bandwidth())
      .transition()
      .duration(100)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); })
      .attr("x", function(d) { return x1(d.key); })


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
