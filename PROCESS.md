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

## MA 21/1/19
* Bar graph update wanneer er op een circle wordt geklikt
* Veel data opnieuw geprocessed naar een format waarmee meer kan
* Een "alles" optie geimplementeerd voor de line graph
* Bestuurskunde Groningen doet raar, morgen naar kijken
* Alle stippen en linegraphs een id gegeven aan de hand waarvan kan worden teruggevonden
  welke data er is gebruikt in de algemene lijsten.

## DI 22/1/19
* Verder data opnieuw gepreprocessed
* Wat layout dingen gedaan
* Probleem met Groningen op gelost
* Wat nog moet worden gedaan: een deleteknop en zorgen dat de lijngrafiek update
  bij het klikken op de kaart

## WO 23/1/19
* Gewerkt aan een deleteknop
* In de updatefunctie een delete optie aangemaakt


## DO 24/1/19
* Hackaton

## VRIJ 25/1/19
* Deleteknop gemaakt door te kunnnen klikken op de bars, je ziet nu in de tooltip
"Klik hier om te verwijderen"
* Main functie is nu slechts het laden van data en starten van functies
* Een linearGradient agenda gemaakt. Wordt gebruikt voor de kaart.
* Bargraph is nu breed en kort zodat hij tegelijk zichtbaar is met linechart


## MA 28/1/19
* UpdateMap functie gemaakt
* Functie gemaakt die zorgt dat de tooltip op de kaart nu ook laat de samenstelling
van de universiteiten laat zien. Wanneer een stad meer dan één universiteit heeft
staat er ook een los totaal aantal studenten in de tooltip.
* Gezorgd dat een slider werkt
* Probeer een mooiere slider te plaatsen van simple slider. Probleem is dat deze
axisBottom gebruikt, waardoor er nu ook een eerdere as van mij wordt gebruikt. Ik ga
dit proberen aan te passen in de code.
* Het is gelukt om de class aan te passen waardoor het probleem met de axisslider is opgelost

## DI 29/1/19
* In plaats van een dropdown nu een select voor het kiezen van de lijn bij de Lijngrafiek
* Wanneer er op een stad wordt geklikt is zie je nu lijnen voor alle universiteiten van die Stad
en de bars
* Dynamische legenda gemaakt met voor de lijnen. Hierdoor kan op deze manier de data
worden aangepast, door te klikken verwijder je de data. De datakleuren veranderen mee.
* Viewboxes toegepast. Nu is alles zichtbaar vanuit een scherm.

## WO 30/1/19
* Astitels aangemaakt waar deze nog misten
* Er was een probleem met het laden van bepaalde data. Het bleek dat de aanwezigheid
van zowel voltijd als deeltijdstudies deze problemen veroorzaakten. Dit is verholpen
door de data van de deeltijdstudies te verwijderen, dit waren namelijk maar 3 studies.
* Geprobeerd enters in de asticks te maken. Dit gaat heel moeilijk.
* Error message van bootstrap gebruikt voor als iemand meer dan vier datasets in
 een grafiek wil plaatsen. Besloten  om dit te doen om overzichtelijkheid te waarborgen.
* Het bleek een uitdagen te zorgen dat bij studies waarbij geen studenten waren,
ook het staafdiagram kon worden verwijderd. Dit is opgelost door te zorgen dat deze
uberhaupt niet in de grafiek komen. In plaats daarvan komt er een alert "Geen
Studenten"
