# Process

## DI 8/1/19
* Eerste data is gepreprocessed. De JSON file is valide.
* Het idee is aangepast: er zal worden geprobeerd ook data van studiekeuze123 te
verzamelen
* Er is een API-verzoek verzonden voor de data van studiekeuze123

## WO 9/1/19
* Eerste vorm van de website gemaakt dmv bootstrap
  * Verschillende pagina's gemaakt
* Geprobeerd een kaart van NL te maken in D3, eentje gevonden maar die klopte niet

## DO 10/1/19
* Goede kaart van Nederland kunnen maken
* Ander idee: eerst was het plan een heatmap te maken voor alle provincies. Nu
  wil ik per stad een bel maken die groter of kleiner is aan de hand van de hoeveelheid
  studenten
* Site kunnen indelen op de manier waarop ik het er iut wil laten zien. Wel met
  nepdata

## VR 11/1/19
* Scalefunctie kunnen maken voor de steden op de kaart
* Data ingeladen en wordt nu toegepast op de kaart
  * nog geen mogelijkheid tot het kiezen van een jaartal, nu alleen de data van
    2017 in gebruik
* Tooltips toegevoegd
* Blijkbaar kan je bij .data() geen dictionary toevoegen maar alleen een lijst,
  hieromheen gewerkt

## MA 14/1/19
* Gelukt om data in te laden voor de lijngraiek en een dropdown te maken om
  opleiding en instelling te kiezen. De lijn update alleen nog niet, maar
  wordt geremoved. Dit ga ik laten aanpassen

* Gewerkt aan de bargraph. Het lukt nog niet heolemaal zoals ik wil.
  Nieuw idee: in plaats van het maken van nieuwe bar Graphs,
  nu de bars toevoegen aan de bestaande bargraph. Ipv gewone bargraph een grouped
  bargraph.


## DI 15/1/19
* Een goed voorbeeld gevonden van een grouped bargraph, deze omgeschreven
  naar een vorm die voor mij werkte
* Geprobeerd data in te laden voor de bargraph, lukt nog niet

## Wo 16/1/19
* Werkende update functie gemaakt voor de lineGraph
* Styleguide gecreeerd
* BEzig met update functie voor Bargraph, werkt nog niet helemaal naar behoren,
  wel gelukt om de x en y as te laten updaten en om een extra group bar charts
  te kunnen aanmaken. Alleen de oude bars blijven nog staan  
* werkomgeving een beetje opgeschoond
