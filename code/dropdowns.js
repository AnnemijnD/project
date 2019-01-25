function makeDropdowns(dataStud){

  instituten = []

  dataStud.forEach(function(d){
  if (!(instituten.includes(d["INSTELLINGSNAAM ACTUEEL"]))){
    instituten.push(d["INSTELLINGSNAAM ACTUEEL"])
  }

  })

  var emptyDropLine = d3.select("#dropdown-instelling")

      emptyDropLine.selectAll("li")
                    .data(instituten)
                    .enter()
                    .append("li")
                    .attr("value", function(d){
                      return d;
                    })
                    .text(function(d){
                      return d;
                    })
                    .on("mouseover", function(d){
                      d3.select(this)
                      .style("color", "blue")

                    })
                    .on("mouseout", function(d){
                      d3.select(this)
                      .style("color", "black")
                    })
                    .on("click", function(d){
                      d3.selectAll("#dropdown-opleiding li")
                        .remove()

                      d3.select("#dropLine-2")
                        .select('button')
                        .text("Opleiding")

                      var instelling = d

                      opleidingen = ["Alles"]


                      d3.select("#dropLine-1 button")
                      .text(instelling)

                      dataStud.forEach(function(x){
                        if(x["INSTELLINGSNAAM ACTUEEL"] === instelling){
                          if (!(opleidingen.includes(x["OPLEIDINGSNAAM ACTUEEL"]))){
                            opleidingen.push(x["OPLEIDINGSNAAM ACTUEEL"])
                          }

                        }
                      })


                      d3.select("#dropdown-opleiding")
                        .selectAll("li")
                        .data(opleidingen)
                        .enter()
                        .append("li")
                        .attr("value", function(d){
                          return d;
                        })
                        .text(function(d){
                          return d;
                        })
                        .on("mouseover", function(d){
                          d3.select(this)
                          .style("color", "blue")

                        })
                        .on("mouseout", function(d){
                          d3.select(this)
                          .style("color", "black")
                        })
                        .on("click", function(d){

                          opleiding = d

                          d3.select("#dropLine-2 button")
                          .text(opleiding)
                          clicked("dropdown", instelling, opleiding)

                        })


                    });

}
