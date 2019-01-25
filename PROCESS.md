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

## WO 16/1/19
* Werkende update functie gemaakt voor de lineGraph
* Styleguide gecreeerd
* BEzig met update functie voor Bargraph, werkt nog niet helemaal naar behoren,
  wel gelukt om de x en y as te laten updaten en om een extra group bar charts
  te kunnen aanmaken. Alleen de oude bars blijven nog staan  
* werkomgeving een beetje opgeschoond


## DO 17/1/19
* Update maken voor bargraph lukt nog steeds niet, probeer nu in een ander voorbeeld
  eerst hetzelfde te doen, hier wel al stappen in gemaakt

## VRIJ 18/1/19
* Bar graph update is gelukt! Nu bezig te implementeren dat wanneer je klikt op een circle
van de lijn grafiek, de bargraph update. Dit is tevens een nieuw plan.
* Algemene variableen aangemaakt die de data zullen dragen zodat deze makkelijk bereikbaar
zijn vanuit alle functies.

## MA 19/1/19
* Bar graph update wanneer er op een circle wordt geklikt
* Veel data opnieuw geprocessed naar een format waarmee meer kan
* Een "alles" optie geimplementeerd voor de line graph
* Bestuurskunde Groningen doet raar, morgen naar kijken
* Alle stippen en linegraphs een id gegeven aan de hand waarvan kan worden teruggevonden
  welke data er is gebruikt in de algemene lijsten.

## DI 20/1/19
* Verder data opnieuw gepreprocessed
* Wat layout dingen gedaan
* Probleem met Groningen op gelost
* Wat nog moet worden gedaan: een deleteknop en zorgen dat de lijngrafiek update
  bij het klikken op de kaart

## WO 21/1/19
* Gewerkt aan een deleteknop
* In de updatefunctie een delete optie aangemaakt
