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

Attempt | #1 | #2 | #3 | #4 | #5 | #6 | #7 | #8 | #9 | #10 | #11
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |---
Seconds | 301 | 283 | 290 | 286 | 289 | 285 | 287 | 287 | 272 | 276 | 269



## Diagram

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
