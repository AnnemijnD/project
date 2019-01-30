# Project Aanmeldingen eerstejaars studenten
Hoe zijn de eerstejaarsaanmeldingen verdeeld over verschillende universiteiten
en jaren?

## Data
### Bron
-	DUO (https://www.duo.nl/open_onderwijsdata/databestanden/ho/ingeschreven/wo-ingeschr/ingeschrevenen-wo3.jsp). Csv is gedownload.
 - http://geojson.io/


### Preprocessen
Het huidige bestand is een CSV file. Er zal een json worden gecreeërd waarbij de
data als volgt is geordend:

Provincie | Gemeentenaam | Instellingsnaam | Opleidingsvorm | Opleidingsnaam | 2013 Man | 2013 Vrouw | 2014 Man | 2014 Vrouw | 2015 Man | 2015 Vrouw | 2016 Man | 2016 Vrouw | 2017 Man | 2017 Vrouw |
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
Noord-Holland | Amsterdam | UvA | Voltijd | Biomedische wetenschappen | 50 | 100 | 53 | 112 | 72 | 134 | 60 | 92 | 98 | 114|

Ook wordt er aan alle data een "Totaal" per jaar toegevoegd. 

Verder wordt er een aparte dataset gemaakt voor alle steden, zodat hier makkelijk totaal hoeveelheden van gevonden kan worden.

Voor het verkrijgen van geodata van de steden voor een kaart wordt gebruik gemaakt van een website: De data is handmatig verkregen door de steden in te voeren.


## Diagram

![Alt text](https://user-images.githubusercontent.com/43959303/50842970-216f9c80-1368-11e9-899a-c9e31f7e81bc.png)

## Componenten

### Kaart Nederland
Er zal een kaart van Nederland worden weergegeven waarbij kleuren van steden overeenkomen
met de bepaalde hoeveelheid studenten van dat jaar. Deze jaartallen zullen in te
stellen zijn door de gebruiker. Er zal een scale functie worden gemaakt die de data zal schalen tot circles op de kaart. Wanner er op een stad wordt gedrukt, zal de lijngrafiek en de staafdiagram de data laten zien.

### Grouped Staafdiagram
Wanneer de gebruiker een opleiding, instelling en jaartal heeft geselecteerd zal een grouped staafdiagram
worden weergegeven die de eerstejaarsstudenten (man/vrouw/totaal) laat zien. 
Wanneer een andere stad wordt geselecteerd zal een tweede groep staven verschijnen, tot een maximum van vier. Er kan ook een opleiding en instelling worden geselecteerd via de lijngrafiek.
De gebruiker kan zelf de diagrammen verwijderen. 

### Lijngrafiek
De gebruiker kan een opleiding en instelling kiezen, vervolgens wordt een lijndiagram weergegeven
welke de eerstejaarsstudenten over de jaren laat zien. Er kan worden gelikt op de lijn, waarbij er een staafdiagram wordt toegevoegd

## Plugins
### D3
* Tip
* Simple-slider

### Bootstrap

### JQuery
