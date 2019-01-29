function makeDropdowns(dataStud){

  instituten = [""];
  opleidingen = [""];

  allData.forEach(function(d){
  if (!(instituten.includes(d["INSTELLINGSNAAM ACTUEEL"]))){
    instituten.push(d["INSTELLINGSNAAM ACTUEEL"])
  }

  })

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

    // selectOpleiding
    // .selectAll("option")
    // .data()

  // voeg data toe aan tweede dropdown
    selectInstelling
    .on("change", function(d){

      opleidingen = [""]
      instelling = this.value
      allData.forEach(function(x){
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
        updateLine(opleiding, instelling)
      })
    })
}
