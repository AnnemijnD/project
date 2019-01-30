// Annemijn Dijkhuis 11149272
// Eindproject Minor programmeren
// Maakt en update een staafdiagram

var marginBar = {top: 40, right: 100, bottom: 30, left: 40}
var widthBar = 1100 - marginBar.left - marginBar.right
var heightBar = 300 - marginBar.top - marginBar.bottom


var tipBar =  d3.tip()
              .attr("class", "d3-tip")
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>" + d.key + "</strong><span class='details'>" +
                "<br></span>" +

                "Aantal studenten: <span class='details'>" +
                d.value+"</span>" + "<br>"+
                "Klik om te verwijderen";
              })

function barGraph(){

  // Set tooltips


  var svg = d3.select("#barGraph svg")
              .attr("width", widthBar + marginBar.left + marginBar.right)
              .attr("height", heightBar + marginBar.top + marginBar.bottom)

      // margin = {top: 40, right: 100, bottom: 30, left: 40}
      // width = +svg.attr("width") - marginBar.left - marginBar.right
      // height = +svg.attr("height") - marginBar.top - marginBar.bottom
      g = svg.append("g").attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");

var title = d3.select("#barGraph svg")
              .append("text")
              .text("Aantal eerstejaarsaanmeldingen in het WO verschillend tussen man en vrouw")
              .attr("x", function() {return widthBar/3})
              .attr("y", function() {return marginBar.bottom/2})


  // The scale spacing the groups:
  var x0 = d3.scaleBand()
      .rangeRound([0, widthBar])
      .paddingInner(0.1);

  // The scale for spacing each group"s bar:
  var x1 = d3.scaleBand()
      .padding(0.05);

  var y = d3.scaleLinear()
      .rangeRound([heightBar, 0]);

  var z = d3.scaleOrdinal()
        .range(d3.schemeDark2)


  var keys = ["Vrouw", "Man", "Totaal"]
  updateBarGraph("Biomedische Wetenschappen", "Universiteit van Amsterdam", 2016, "Append")



  x0.domain(barGraphData.map(function(d) { return `${d.Opleiding}, ${d.Instelling}, ${d.jaar}`; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(barGraphData, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

  g.append("g")
      .attr("class", "xAxisBar")
      .attr("transform", "translate(0," + heightBar   + ")")
      .call(d3.axisBottom(x0));

  g.select(".axis")
    .selectAll("text")
    .html(function(d) {return console.log(d)})



  g.append("g")
      .attr("class", "yAxisBar")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Aantal studenten");

  var legend = svg.append("g")
      .attr("transform", function(d) {return "translate(20,0)"})
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice())
    .enter().append("g")
      .attr("transform", function(d, i) {  return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", widthBar + marginBar.right)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", z)
      .attr("stroke", z)
      .attr("stroke-width",2)

  legend.append("text")
      .attr("x", widthBar + marginBar.right - 7)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

}

  function updateBarGraph(opleiding, instelling, jaar, type) {
    $(".alert").hide()

    var svg = d3.select("#barGraph svg")

    svg.call(tipBar);


      if (opleiding === "Alles"){

        uniData.forEach(function(d){
          if (d["INSTELLINGSNAAM ACTUEEL"] === instelling){
          var vrouwen = parseInt((d[`${jaar} VROUW`]));
          var mannen = parseInt((d[`${jaar} MAN`]));
          var totaal = parseInt((d[`TOTAAL ${jaar}`]));

          if (totaal == 0){
            $("#alert").text("Geen studenten")
            $("#alert").show()
            return 0
          }

          for (var i = 0; i < barGraphData.length; i++){
            if (opleiding === barGraphData[i]["Opleiding"]){
              if (instelling === barGraphData[i]["Instelling"]){
                if (jaar === barGraphData[i]["jaar"]){
                  if (type === "Delete"){
                  barGraphData.splice(i, 1)
                  }
                  else{
                    return 0
                  }
              }
              }
            }
          }

          if (type === "Append"){
            if (barGraphData.length > 3){
                $("#alert").text(message)
                $(".alert").show()
              }
              else{

                barGraphData.push({Instelling: instelling, Opleiding: opleiding,
                  jaar:jaar, Man: mannen, Vrouw: vrouwen, Totaal: totaal})
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

                if (totaal == 0){
                  $("#alert").text("Geen studenten")
                  $("#alert").show()
                  return 0
                }

                for (var i = 0; i < barGraphData.length; i++){
                  if (opleiding === barGraphData[i]["Opleiding"]){
                    if (instelling === barGraphData[i]["Instelling"]){
                      if (jaar === barGraphData[i]["jaar"]){
                        if (type === "Delete"){

                        barGraphData.splice(i, 1)
                        }
                        else{
                          return 0
                        }
                    }
                    }
                  }
                }

            if (type === "Append"){
              if (barGraphData.length > 3){
                  $("#alert").text(message)
                  $(".alert").show()
                }
                else{

                  barGraphData.push({Instelling: instelling, Opleiding: opleiding,
                    jaar:jaar, Man: mannen, Vrouw: vrouwen, Totaal: totaal})
                }
              }


            }
          }
      })
    }

    var data = barGraphData

    var svg = d3.select("#barGraph svg")

    // // state the height
    // margin = {top: 40, right: 100, bottom: 30, left: 40}
    // width = +svg.attr("width") - marginBar.left - marginBar.right
    // height = +svg.attr("height") - marginBar.top - marginBar.bottom

    // get the keys that are needed to get the data
    var keys = ["Vrouw", "Man", "Totaal"]

    // make scales for the axes
    var x0 = d3.scaleBand()
        .rangeRound([0, widthBar])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([heightBar, 0]);


    var z = d3.scaleOrdinal()
              // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
              .range(d3.schemeDark2)

    x0.domain(data.map(function(d) { return `${d.Opleiding}, ${d.Instelling}, ${d.jaar}`; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();


    //  var insertLinebreaks = function (d) {
    //
    //    var el = d3.select(this);
    //    var words= d.split(",");
    //
    //    // el.text("");
    //
    //    console.log(el)
    //
    //  for (var i = 0; i < words.length; i++) {
    //    var tspan = el.append("tspan").text(words[i]);
    //      if (i > 0){
    //            tspan.attr("x", 0).attr("dy", "15");
    //         }
    //      }
    // };

    //      svg.selectAll(".xAxisBar g text").each(insertLinebreaks);
    // update the x axis
    d3.select(".xAxisBar")
      .transition()
      .duration(500)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      // .text(function(d){
      //   var self = this;
      //   return insertLinebreaks(d, self)})
        .style("font-size", "7px")




    // update the y axis
    d3.select(".yAxisBar")
    .transition()
    .call(d3.axisLeft(y).ticks(null, "s"))
    .duration(500);


    // d3.select(".xAxisBar")
    //   .selectAll(".tick text")
    //   .on("click", function(d){
    //
    //   opleiding = d.split(",")[0]
    //   instelling = d.split(",")[1]
    //   jaar = parseInt(d.split(",")[2])
    //
    //
    //   return updateBarGraph(opleiding, instelling, jaar, "Delete")
    // })

    var dataKeys = []

     data.forEach(function(d){
       return keys.map(function(key) {
          return dataKeys.push({key: key, value: d[key]})
        })
      });

    // remove necessary groups
    var groups = svg.selectAll(".bar").data(data)

    groups.exit().remove()

    // update the groups
    groups
    .transition()
    .duration(100)
    .attr("transform", function(d) { return "translate(" + x0(`${d.Opleiding}, ${d.Instelling}, ${d.jaar}`) + ")"; })

    // update the newly inserted groups
    d3.selectAll("#extra")
    .transition()
    .duration(100)
    .attr("transform", function(d) { return "translate(" + (x0(`${d.Opleiding}, ${d.Instelling}, ${d.jaar}`) + marginBar.left) + "," + marginBar.top + ")"; })


    // enter the new groups and rectangles
    groups.enter().append("g")
    .attr("class","bar")
    .attr("id", "extra")
    .attr("transform", function(d) { return "translate(" + (x0(`${d.Opleiding}, ${d.Instelling}, ${d.jaar}`) + marginBar.left)  + "," + marginBar.top + ")"; })
    .on("click",function(d) {
                      updateBarGraph(d.Opleiding,
                                      d.Instelling, d.jaar, "Delete")})
    .selectAll("rect")

    .data(function(d) {return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .on("mouseover", function(d){

        tipBar.show(d);
        var self = this;

      })
      .on("mouseout", function(d){
        tipBar.hide(d);
      })
      .on("click", function(d){
        tipBar.hide(d);
      })
      .attr("class", "barRect")
      .attr("y", function(d) { return y(0); })
      .attr("height", "0")
      .attr("width", function(d,) {
        return x1.bandwidth()})
      .transition()
      .duration(100)
      .attr("y", function(d, i ){
        // if (i - 2 % 3 == 0){
        //   if (d.value == 0){
        //       return y(max/2)
        //     };
        //   };
            return y(d.value); })
      .attr("height", function(d, i) {
        // if (i - 2 % 3 == 0){
        //   if (d.value == 0){
              // return 40;
          //   };
          // }
        // })
        return heightBar - y(d.value); })
      .attr("fill", function(d) { return z(d.key); })
      .attr("x", function(d) {
        return x1(d.key); })


   //  var insertLinebreaks = function (d) {
   //
   //    var el = d3.select(this);
   //    var words=d3.select(this).text().split(",");
   //
   //    el.select("text").remove()
   //    el.text("");
   //
   //  for (var i = 0; i < words.length; i++) {
   //    var tspan = el.append("tspan").text(words[i]);
   //      if (i > 0)
   //            tspan.attr("x", 0).attr("dy", "15");
   //      }
   // };
   //
   //      svg.selectAll(".xAxisBar g text").each(insertLinebreaks);

    // check bar data
    var bars = svg.selectAll(".bar").selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })

    // Adjust the remaining bars:
    //
    bars
      .transition()
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d, i) {
        if (i - 2 % 3 === 0){
          if (d.value === 0){
              return y(40);
            };
          }return y(d.value); })
      .attr("height", function(d, i) {
          return heightBar - y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("fill", function(d, i) {
        return z(d.key); })
      .duration(500);


  // // geef de aslabels enters
  //     d3.select(".xAxisBar")
  //       .selectAll("text")
  //       .html(function(d){
  //         var newText = ""
  //         var varlist = d.split(",")
  //         varlist.forEach(function(d){
  //           enterOpen = "<br>"
  //           enterClose = "</br>"
  //           newText += enterOpen + d + enterClose
  //         })
  //         return newText
  //
  //       })






  }
