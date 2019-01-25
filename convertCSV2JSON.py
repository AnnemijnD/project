# Annemijn Dijkhuis
# 11149272
# imports data and converts it to a JSONfiles

import csv
import json
from collections import OrderedDict




def convert_csv_json():
    """
    Converts a csvfile to a jsonfile
    """

    # load files
    in_file = open('data/eerstejaars.csv', 'r', encoding = "ISO-8859-1")
    # open('eerstejaars.csv', 'r')

    out_file = open('data/eerstejaars.json', 'w')


    out_file2 = open("data/instellingen.json", "w")
    # write rows
    reader = csv.DictReader(in_file, delimiter=';')
    rows = [row for row in reader]




    instelling_opleiding = {"":[]}
    universiteiten = []
    # combine_dict = {"": []}

    new_file_rows = []

    for i in range(len(rows) - 1, -1, -1):


        if not rows[i]["TYPE HOGER ONDERWIJS"] == "bachelor":
            del rows[i]

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


    for i in range(len(rows)):
        rows[i]["TOTAAL 2013"] = rows[i]["2013 MAN"] + rows[i]["2013 VROUW"]
        rows[i]["TOTAAL 2014"] = rows[i]["2014 MAN"] + rows[i]["2014 VROUW"]
        rows[i]["TOTAAL 2015"] = rows[i]["2015 MAN"] + rows[i]["2015 VROUW"]
        rows[i]["TOTAAL 2016"] = rows[i]["2016 MAN"] + rows[i]["2016 VROUW"]
        rows[i]["TOTAAL 2017"] = rows[i]["2017 MAN"] + rows[i]["2017 VROUW"]
        # print(rows[i])
        # print("\n")
        rows[i].pop("")
        # print(rows[i])



    for i in range(len(rows)):

        university = rows[i]["INSTELLINGSNAAM ACTUEEL"]
        city = rows[i]["GEMEENTENAAM"]
        new_university = True

        if rows[i]["OPLEIDINGSNAAM ACTUEEL"].split()[0] == "B":
            rows[i]["OPLEIDINGSNAAM ACTUEEL"] = rows[i]["OPLEIDINGSNAAM ACTUEEL"].replace("B ", "")


        for j in range(len(new_file_rows)):


            if rows[i]["INSTELLINGSNAAM ACTUEEL"] in universiteiten:
                if rows[i]["INSTELLINGSNAAM ACTUEEL"] == new_file_rows[j]["INSTELLINGSNAAM ACTUEEL"]:
                    print(type(rows[i]["2013 MAN"]))
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
             # d = OrderedDict([("INSTELLINGSNAAM ACTUEEL", rows[i]["INSTELLINGSNAAM ACTUEEL"]),
             # ("2013 MAN", rows[i]["2013 MAN"]),("2013 VROUW", rows[i]["2013 VROUW"]),
             # ("2014 MAN", rows[i]["2014 MAN"]),
             #
             #  ])

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
            print(d)

            new_file_rows.append(d)
            universiteiten.append(d["INSTELLINGSNAAM ACTUEEL"])


            # OrderedDict([('PROVINCIE', 'Zuid-Holland'), ('GEMEENTENUMMER', '0599'), ('GEMEENTENAAM', 'ROTTERDAM'), ('SOORT INSTELLING', 'reguliere inst.'), ('TYPE HOGER ONDERWIJS', 'bachelor'), ('BRIN NUMMER ACTUEEL', '21PE'), ('INSTELLINGSNAAM ACTUEEL', 'Erasmus Universiteit Rotterdam'), ('CROHO ONDERDEEL', 'gezondheidszorg'), ('CROHO SUBONDERDEEL', 'n.v.t. (gezondheidszorg)'), ('OPLEIDINGSCODE ACTUEEL', '56553'), ('OPLEIDINGSNAAM ACTUEEL', 'B Gezondheidswetenschappen'), ('OPLEIDINGSVORM', 'voltijd onderwijs'), ('OPLEIDINGSFASE ACTUEEL', 'bachelor'), ('2013 MAN', 31), ('2013 VROUW', 94), ('2014 MAN', 24), ('2014 VROUW', 71), ('2015 MAN', 25), ('2015 VROUW', 65), ('2016 MAN', 10), ('2016 VROUW', 64), ('2017 MAN', 33), ('2017 VROUW', 81), ('TOTAAL 2013', 125), ('TOTAAL 2014', 95), ('TOTAAL 2015', 90), ('TOTAAL 2016', 74), ('TOTAAL 2017', 114)])





    # if rows[i]["GEMEENTENAAM"] not in steden:
    #     steden.append(rows[i]["GEMEENTENAAM"])

    # if not rows[i]["SOORT INSTELLING"] == "reguliere inst.":
    #     print(rows[i])





    # write jsonfile
    output = json.dumps(rows)
    output2 = json.dumps(new_file_rows)

    out_file.write(output)
    out_file2.write(output2)

    return out_file

if __name__ == "__main__":
    json_file = convert_csv_json()
