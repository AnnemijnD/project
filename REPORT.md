# Eindproject minor programmeren
## Annemijn Dijkhuis - 11149272

### Veranderingen in studeren

In verschillende debatten rondom studeren, denk hierbij aan de man/vrouw verhoudingen, maar ook aan de veranderingen van het studeren sinds de afschaffing van de studiefinanciering als gift, is data van aanmeldingen voor studies essentieel. Een visualisatie hiervan kan een gesprek bevorderen en aannames ondersteunen. Daarnaast kan het voor aankomend studenten wellicht prettig zijn om van een studie waarin zij geinteresseerd zijn te kunnen opzoeken hoeveel studenten er (over de agelopen jaren) zich hebben aangemeld.

Voor dit project zijn met behulp van data van DUO verschillende visualisaties gemaakt om deze informatie te weergeven.

![](doc/view.png)

### Functionaliteit Code

#### Python

###### convertCSV2JSON.py
In deze functie wordt de CSV file met data omgezet naar een bruikbare JSON. Verder wordt hier data geparsed. Masters en deeltijdstudies worden verwijderd. Sommige studies staan er twee keer in, één keer als "bachelor" en één keer als "propedeuse bachelor". Deze twee getallen worden samengevoegd.

Verder stond voor alle bachelors een "B", zoals bijvoorbeeld: "B Biomedische wetenschappen". Deze "B" wordt in dit script verwijderd.

Er worden twee JSONs gecreeërd:
* JSON met alle data
* JSON met de data voor alle steden (voor de kaart van Nederland)

#### Javascript

###### main.js
In main.js worden de datasets ingeladen en worden de verschillende functies die de visualisaties opzetten aangeroepen:
* createMap()
* lineGraph()
* barGraph()

De datasets worden in globale variabelen gezet, zodat deze makkelijk beschikbaar zijn vanaf de andere functies. Daarnaast zijn een aantal harde variabelen (zoals het eerste en laatste jaar waarin we data bekijken) in globale variabelen gezet.


###### map.js
* createMap
* updateMap

In map.js wordt een kaart van Nederland gemaakt met behulp van d3 en de eerder ingeladen geodata. Er wordt een lineair scaled legenda gemaakt en een slider waarbij de gebruiker kan kiezen tussen de jaren van 2013-2017.


Verder is er een updatefunctie die aan de hand van een jaartal de cirkels op de kaart plaatst op de positie van een stad. De updatefunctie wordt aangeroepen in createMap met een default waarde van 2017.
De geodata voor de posities van de steden is handmatig verzameld en als JSON geladen. Dit is gebeurd in main.js.

De cirkels zijn verbonden aan de hoeveelheid studenten die zich in dat jaar in die stad hebben aangemeld. Wanneer de slider wordt gebruikt, wordt de updatefunctie aangeroepen. De kleur en grootte van een cirkel worden bepaald aan de hand van een schaal, waarbij een grotere, blauwere cirkel meer studenten betekent dan een kleinere, rode cirkel.

Om de cirkels op de juiste positie te zetten op de kaart wordt gebruikt gemaakt van een circleScaleX en circleScaleY functie. Deze functie is ontstaan uit het makeScaleFuncties.js script.

###### makeScaleFunctions.js
* test

Deze functie is een functie waarmee met verschillende data uit de geodata van de steden is getest welke schaal de meest accurate plaatsing van de cirkels geeft.

In eerste instantie zijn de posities van twee steden op het kaart SVG gekozen. Vervolgens is gekeken naar de x en y coordinaten die voor die steden te vinden zijn in de geodata. Hiermee is een functie gemaakt om te voorspellen wat de positie van de andere steden zou zijn, welke vervolgens werd getest in de map.js updatefunctie. Het bleek dat uiteindelijk de meest accurate plaatsing werd verkegen door Groningen en Amsterdam als uitgangspunten te nemen.

###### dropdowns.js
* makeDropdowns

In dit stuk script wordt een functie aangeroepen die dropdowns maakt voor de lijngrafiek. De dropdown voor instellingen wordt altijd helemaal gevuld met alle instellingen. De dropdown voor opleidingen wordt enkel gevuld met de opleidingen van de eerder aangeklikte instelling.

###### barGraph.js
* barGraph
* updateBarGraph

In barGraph wordt de basis gelegd voor het kunnen neerzetten van een staafdiagram. Er worden assen, titels en een legenda aangemaakt. De updatefunctie wordt aangeroepen voor een default staafdiagram voor de studie Biomedische wetenschappen aan de UvA in 2016.

In updateBarGraph worden gegroepeerde staafdiagrammen toegevoegd of verwijderd. Als het type "Append" is wordt er één toegevoegd. Als het type "Delete" is, wordt deze verwijderd.

De assen worden opnieuw geschaald en de groepen staafdiagrammen die er al staan worden aangepast aan de hand van het enter/update/exit systeem.


###### lineGraph.js
* lineGraph
* updateLine

In lineGraph wordt de basis gelegd voor een lijngrafiek. 

#### HTML

###### index.html

###### vis.html

###### bronnen.html

#### CSS

###### index.css
