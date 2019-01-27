function clicked(webElement, instelling, opleiding, jaar, id){
    wE = webElement

    if (wE === "map"){


    }

    else if (wE === "linegraph"){

      updateLine(opleiding, instelling)

    }

    else if (wE === "bargraph"){
      updateBarGraph(opleiding, instelling, jaar, "Append")

    }

    else if (wE === "dropdown"){

      updateLine(opleiding, instelling)

    }


}
