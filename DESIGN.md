# Project Aanmeldingen eerstejaars studenten
Hoe zijn de eerstejaarsaanmeldingen verdeeld over verschillende universiteiten
en jaren?

## Data
### Bron
-	DUO (https://www.duo.nl/open_onderwijsdata/databestanden/ho/ingeschreven/wo-ingeschr/ingeschrevenen-wo3.jsp). Csv is gedownload.
-	Eventueel: API studiekeuze123.nl. Aanvraagformulier is verzonden.

### Preprocessen
Het huidige bestand is een CSV file. Er zal een json worden gecreeërd waarbij de
data als volgt is geordend:

Provincie | Gemeentenaam | Instellingsnaam | Opleidingsvorm | Opleidingsnaam | 2013 Man | 2013 Vrouw | 2014 Man | 2014 Vrouw | 2015 Man | 2015 Vrouw | 2016 Man | 2016 Vrouw | 2017 Man | 2017 Vrouw |
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |--- |
Noord-Holland | Amsterdam | UvA | Voltijd | Biomedische wetenschappen | 50 | 100 | 53 | 112 | 72 | 134 | 60 | 92 | 98 | 114|

Als het mogelijk is per opleiding een cijfer toe te voegen van de data van studiekeuze123.nl,
zal dat worden gedaan per jaar.

## Diagram

![Alt text](https://user-images.githubusercontent.com/43959303/50842970-216f9c80-1368-11e9-899a-c9e31f7e81bc.png)

## Componenten

### Kaart Nederland
Er zal een kaart van Nederland worden weergegeven waarbij kleuren overeenkomen
met de bepaalde hoeveelheid studenten van dat jaar. Deze jaartallen zullen in te
stellen zijn door de gebruiker.

### Staafdiagram
Wanneer de gebruiker een opleiding en jaartal heeft geselecteerd zal een staafdiagram
worden weergegeven die de eerstejaarsstudenten (man/vrouw) laat zien.
Wanneer een andere opleiding wordt geselecteerd zal een tweede staafdiagram verschijnen.
De gebruiker kan zelf de diagrammen verwijderen.

### Lijngrafiek
De gebruiker kan een opleiding kiezen, vervolgens wordt een lijndiagram weergegeven
welke de eerstejaarsstudenten over de jaren laat zien. Daarbij zal worden aangegeven
wanneer de studifinanciering stopte.

## Plugins
### D3
* Tip

### Bootstrap
