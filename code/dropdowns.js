// Annemijn Dijkhuis 11149272
// Eindproject Minor programmeren
// Maakt dropdowns

function makeDropdowns(){

  instituten = ["Kies Instelling"];
  opleidingen = ["Kies Opleiding"];

  // vind de juiste data
  ALLDATA.forEach(function(d){
  if (!(instituten.includes(d["INSTELLINGSNAAM ACTUEEL"]))){
    instituten.push(d["INSTELLINGSNAAM ACTUEEL"])
  }

  })

  // maak een rij voor de dropdowns
  var row = d3.select("#lineBlock")
              .append("div")
              .attr("class", "row")


  row.append("div")
      .attr("class", "col-sm-6")
      .attr("id", "dropdownInst")


  row.append("div")
      .attr("class", "col-sm-6")
      .attr("id","dropdownOpl" )


  // initieer dropdown
  var selectInstelling = d3.select("#dropdownInst")
                          .append("select")

  var selectOpleiding = d3.select("#dropdownOpl")
                          .append("select")


  // voeg data toe
    selectInstelling
    .selectAll("option")
    .data(instituten)
    .enter()
    .append("option")
    .attr("value", function(d) {return d})
    .text(function(d){return d})

    selectOpleiding
    .selectAll("option")
    .data(opleidingen)
    .enter()
    .append("option")
    .attr("value", function(d) {return d})
    .text(function(d){return d})

  // voeg data toe aan tweede dropdown
    selectInstelling
    .on("change", function(d){
      selectOpleiding.selectAll("option").remove();

      opleidingen = ["Kies Opleiding"]
      instelling = this.value
      ALLDATA.forEach(function(x){
            if(x["INSTELLINGSNAAM ACTUEEL"] === instelling){
              if (!(opleidingen.includes(x["OPLEIDINGSNAAM ACTUEEL"]))){
                opleidingen.push(x["OPLEIDINGSNAAM ACTUEEL"])
              }
            }
          })


    selectOpleiding
      .selectAll("option")
      .data(opleidingen)
      .enter()
      .append("option")
      .attr("value", function(d) {return d})
      .text(function(d){return d})

      selectOpleiding
      .on("change", function(d){
        var opleiding = this.value;
        updateLine(opleiding, instelling, "Append")
      })
    })
}
