# Proposal
Annemijn Dijkhuis 11149272


## Probleem
In verschillende debatten rondom studeren, denk ik hierbij aan de man/vrouw verhoudingen, maar ook aan de veranderingen van het studeren sinds de afschaffing van de studiefinanciering als gift, is data van aanmeldingen voor studies essentieel. Een visualisatie hiervan kan een gesprek bevorderen en aannames ondersteunen.

## Oplossing
Ik wil voor mijn project verschillende onderdelen van een dataset over aanmeldingen voor studies visualiseren zodat deze makkelijker te vergelijken zijn.


## Main features
### MVP
1)	Een kaart van Nederland met de data van verschillende provincies wanneer je er overheen gaat met de muis
a.	Wanneer op een provincie wordt geklikt wordt informatie weergegeven van deze provincie, waarbij de verschillende faculteiten van deze universiteiten onder elkaar staan per universiteit en ook weer de hoeveelheden studenten (en mannen en vrouwen) te zien zijn.
2)	Een menu waarin je opleidingen, een jaar en een universiteit kan kiezen
a.	Hieruit komt een grafiek met de aanmeldingen van dat jaar van mannen en vrouwen
b.	Wanneer het menu opnieuw wordt ingevuld blijft de vorige grafiek staan zodat de grafieken kunnen worden vergeleken.
3)	Een lijngrafiek van de aanmeldingen van studenten van de afgelopen vijf jaar, evt aangevuld met man/vrouw verschillen.
Optioneel
1)	HBO toevoegen aan de dataset zodat studieaantallen ook kunnen worden vergeleken
2)	Een animatie in de kaart van de veranderingen in aanmeldingen
3)	De studies indelen in afla/beta/gamma en een vergelijkingen tussen aanmeldingen van mannen een vrouwen maken.

1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

### Schets
![Alt text](https://user-images.githubusercontent.com/43959303/50844788-cb045d00-136b-11e9-9276-da8a5a1f419f.png)
![Alt text](https://user-images.githubusercontent.com/43959303/50844819-d9527900-136b-11e9-9d88-07e7dfaa18ee.png)

## Prerequisites
-	https://www.duo.nl/open_onderwijsdata/databestanden/ho/ingeschreven/wo-ingeschr/ (twijfel tussen alleen WO of ook HBO)
-	External components: Waarschijnlijk de D3 library
-	Gerelateerde visualisaties: https://dboekhout.github.io/CSRIB/  de manier waarop je met de muis over de kaart kan gaan en op een land kan klikken. Dit wil ik ook maar dan met de provincies van Nederland. Ik wil graag ook een barchart voor het vergelijken van studentenaantallen binnen een faculteit.
-	Wellicht moet ik provincies veranderen naar steden waar universiteiten staan. Daarnaast wordt het misschien te ingewikkeld om het HBO toe te voegen omdat die niet op dezelfde manier in faculteiten zijn opgedeeld. Ook is het zo dat sommige faculteiten anders zijn opdgedeeld dan anderen. Zo is bij de UvA Biomedische wetenschappen ingedeeld bij het FNWI, maar is dit bij de UU bij Geneeskunde. Dit zou duidelijk moeten worden gemaakt onder de grafiek.   
