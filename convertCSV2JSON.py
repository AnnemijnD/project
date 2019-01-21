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

    out_file = open('data/eerstejaars.json', 'w')


    # write rows
    reader = csv.DictReader(in_file, delimiter=';')
    rows = [row for row in reader]




    instelling_opleiding = {"":[]}
    steden = []
    combine_dict = {"": []}


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
                            rows[j]["2013 MAN"] += rows[i]["2013 VROUW"]
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

    for i in range(len(rows) - 1, -1, -1):

        g = 0
        for k in rows[i]:
            g += 1
            if g > 13 and g < 24:
                if (g-1)%2 == 0:








    # if rows[i]["GEMEENTENAAM"] not in steden:
    #     steden.append(rows[i]["GEMEENTENAAM"])

    # if not rows[i]["SOORT INSTELLING"] == "reguliere inst.":
    #     print(rows[i])





    # write jsonfile
    output = json.dumps(rows)

    out_file.write(output)

    return out_file

if __name__ == "__main__":
    json_file = convert_csv_json()
