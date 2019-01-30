# Annemijn Dijkhuis
# 11149272
# imports data and converts it to a JSONfiles

import csv
import json

def convert_csv_json():
    """
    Converts a csvfile to a jsonfile
    """

    # load files
    in_file = open('data/eerstejaars.csv', 'r', encoding = "ISO-8859-1")
    # open('eerstejaars.csv', 'r')

    # alle data
    out_file = open('data/eerstejaars.json', 'w')

    # tweede file voor data per universiteit
    out_file2 = open("data/instellingen.json", "w")

    # schrijft row
    reader = csv.DictReader(in_file, delimiter=';')
    rows = [row for row in reader]


    instelling_opleiding = {"":[]}
    universiteiten = []

    new_file_rows = []

    # verwijder als het geen bachelor is
    for i in range(len(rows) - 1, -1, -1):
        if not rows[i]["TYPE HOGER ONDERWIJS"] == "bachelor":
            del rows[i]

    # voeg data van dezelfde opleidingen aan elkaar toe
    for i in range(len(rows) - 1, -1, -1):
        g = 0
        for k in rows[i]:
            g += 1
            if g > 13 and g < 24:
                rows[i][k] = int(float(rows[i][k]))

        delete_row = False
        instelling = rows[i]['INSTELLINGSNAAM ACTUEEL']
        opleiding = rows[i]["OPLEIDINGSNAAM ACTUEEL"]


        if instelling in instelling_opleiding:
            if opleiding in instelling_opleiding[instelling]:
                # print(rows[i]["TYPE HOGER ONDERWIJS"])
                for j in range(len(rows) -1, -1, -1):

                    if rows[j]["INSTELLINGSNAAM ACTUEEL"] == instelling:
                        if rows[j]["OPLEIDINGSNAAM ACTUEEL"] == opleiding:
                            rows[j]["2013 MAN"] += rows[i]["2013 MAN"]
                            rows[j]["2013 VROUW"] += rows[i]["2013 VROUW"]
                            rows[j]["2014 MAN"] += rows[i]["2014 MAN"]
                            rows[j]["2014 VROUW"] += rows[i]["2014 VROUW"]
                            rows[j]["2015 MAN"] += rows[i]["2015 MAN"]
                            rows[j]["2015 VROUW"] += rows[i]["2015 VROUW"]
                            rows[j]["2016 MAN"] += rows[i]["2016 MAN"]
                            rows[j]["2016 VROUW"] += rows[i]["2016 VROUW"]
                            rows[j]["2017 MAN"] += rows[i]["2017 MAN"]
                            rows[j]["2017 VROUW"] += rows[i]["2017 VROUW"]

                            delete_row = True
                            break
            else:
                instelling_opleiding[instelling].append(opleiding)

        else:
            instelling_opleiding[instelling] = []

        if delete_row:
            del rows[i]

    # maakt een "totaal" in de data
    for i in range(len(rows)):
        rows[i]["TOTAAL 2013"] = rows[i]["2013 MAN"] + rows[i]["2013 VROUW"]
        rows[i]["TOTAAL 2014"] = rows[i]["2014 MAN"] + rows[i]["2014 VROUW"]
        rows[i]["TOTAAL 2015"] = rows[i]["2015 MAN"] + rows[i]["2015 VROUW"]
        rows[i]["TOTAAL 2016"] = rows[i]["2016 MAN"] + rows[i]["2016 VROUW"]
        rows[i]["TOTAAL 2017"] = rows[i]["2017 MAN"] + rows[i]["2017 VROUW"]
        rows[i].pop("")



    # Maakt een nieuwe file speciaal voor alleen de universiteiten
    for i in range(len(rows)):

        # checkt of de universiteit al is opgeslagen
        university = rows[i]["INSTELLINGSNAAM ACTUEEL"]
        city = rows[i]["GEMEENTENAAM"]
        new_university = True

        # haalt storende "B" weg in text
        if rows[i]["OPLEIDINGSNAAM ACTUEEL"].split()[0] == "B":
            rows[i]["OPLEIDINGSNAAM ACTUEEL"] = rows[i]["OPLEIDINGSNAAM ACTUEEL"].replace("B ", "")

        # voegt data bij universiteit
        for j in range(len(new_file_rows)):


            if rows[i]["INSTELLINGSNAAM ACTUEEL"] in universiteiten:
                if rows[i]["INSTELLINGSNAAM ACTUEEL"] == new_file_rows[j]["INSTELLINGSNAAM ACTUEEL"]:
                    new_file_rows[j]["2013 MAN"] += rows[i]["2013 MAN"]
                    new_file_rows[j]["2013 VROUW"] += rows[i]["2013 VROUW"]
                    new_file_rows[j]["2014 MAN"] += rows[i]["2014 MAN"]
                    new_file_rows[j]["2014 VROUW"] += rows[i]["2014 VROUW"]
                    new_file_rows[j]["2015 MAN"] += rows[i]["2015 MAN"]
                    new_file_rows[j]["2015 VROUW"] += rows[i]["2015 VROUW"]
                    new_file_rows[j]["2016 MAN"] += rows[i]["2016 MAN"]
                    new_file_rows[j]["2016 VROUW"] += rows[i]["2016 VROUW"]
                    new_file_rows[j]["2017 MAN"] += rows[i]["2017 MAN"]
                    new_file_rows[j]["2017 VROUW"] += rows[i]["2017 VROUW"]
                    new_file_rows[j]["TOTAAL 2013"] += rows[i]["2013 MAN"] + rows[i]["2013 VROUW"]
                    new_file_rows[j]["TOTAAL 2014"] += rows[i]["2014 MAN"] + rows[i]["2014 VROUW"]
                    new_file_rows[j]["TOTAAL 2015"] += rows[i]["2015 MAN"] + rows[i]["2015 VROUW"]
                    new_file_rows[j]["TOTAAL 2016"] += rows[i]["2016 MAN"] + rows[i]["2016 VROUW"]
                    new_file_rows[j]["TOTAAL 2017"] += rows[i]["2017 MAN"] + rows[i]["2017 VROUW"]

                    new_university = False

        if new_university:

            d = {}
            d["INSTELLINGSNAAM ACTUEEL"] = rows[i]["INSTELLINGSNAAM ACTUEEL"]
            d["GEMEENTENAAM"] = city
            d["2013 MAN"] = rows[i]["2013 MAN"]
            d["2013 VROUW"] = rows[i]["2013 VROUW"]
            d["2014 MAN"] = rows[i]["2014 MAN"]
            d["2014 VROUW"] = rows[i]["2014 VROUW"]
            d["2015 MAN"] = rows[i]["2015 MAN"]
            d["2015 VROUW"] = rows[i]["2015 VROUW"]
            d["2016 MAN"] = rows[i]["2016 MAN"]
            d["2016 VROUW"] = rows[i]["2016 VROUW"]
            d["2017 MAN"] = rows[i]["2017 MAN"]
            d["2017 VROUW"] = rows[i]["2017 VROUW"]
            d["TOTAAL 2013"] = rows[i]["2013 MAN"] + rows[i]["2013 VROUW"]
            d["TOTAAL 2014"] = rows[i]["2014 MAN"] + rows[i]["2014 VROUW"]
            d["TOTAAL 2015"] = rows[i]["2015 MAN"] + rows[i]["2015 VROUW"]
            d["TOTAAL 2016"] = rows[i]["2016 MAN"] + rows[i]["2016 VROUW"]
            d["TOTAAL 2017"] = rows[i]["2017 MAN"] + rows[i]["2017 VROUW"]

            new_file_rows.append(d)
            universiteiten.append(d["INSTELLINGSNAAM ACTUEEL"])



    # zorgt dat alleen voltijd onderwijs in de dataset zit
    for i in range(len(rows) - 1, -1, -1):
        if not rows[i]["OPLEIDINGSVORM"] == "voltijd onderwijs":
            del rows[i]


    # write jsonfile
    output = json.dumps(rows)
    output2 = json.dumps(new_file_rows)

    out_file.write(output)
    out_file2.write(output2)

    return out_file

if __name__ == "__main__":
    json_file = convert_csv_json()
