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




    # write rows
    reader = csv.DictReader(in_file, delimiter=';')
    rows = [row for row in reader]

    # for i in range(len(rows)):
    #     # print(i)
    #     if not rows[i]["TYPE HOGER ONDERWIJS"] == "bachelor":
    #         del rows[i]

    opleidingscodes = {}
    steden = []
    combine_dict = {"": []}


    for j in range(len(rows) - 2):
        opleidingscode = rows[j]["OPLEIDINGSCODE ACTUEEL"]
        if opleidingscode in opleidingscodes:
            if rows[j]["INSTELLINGSNAAM ACTUEEL"] == opleidingscodes[opleidingscode]["INSTELLINGSNAAM ACTUEEL"]:
                opleidingscodes[opleidingscode]["2013 MAN"] += int(float(rows[j]["2013 MAN"]))
                print("hoi")

        else:
            man_2013 = int(float(rows[j]["2013 MAN"]))
            opleidingscodes[opleidingscode] = {"INSTELLINGSNAAM ACTUEEL": rows[j]["INSTELLINGSNAAM ACTUEEL"],
            "2013 MAN": man_2013}


    with open("data/eerstejaarsbachelors.csv", "w") as out_file2:
        writer = csv.writer(out_file2)
        writer.writerow(["PROVINCIE","GEMEENTENAAM", "TYPE HOGER ONDERWIJS",
        "INSTELLINGSNAAM ACTUEEL", "OPLEIDINGSCODE ACTUEEL", "OPLEIDINGSNAAM ACTUEEL",
        "2013 MAN","2013 VROUW", "2014 MAN", "2014 VROUW", "2015 MAN", "2015 VROUW",
        "2016 MAN", "2016 VROUW", "2017 MAN", "2017 VROUW"])
        for i in range(len(rows) - 1, -1, -1):
            # if not rows[i]["OPLEIDINGSCODE ACTUEEL"] in opleidingscodes:
            #     opleidingscodes[rows[i]["OPLEIDINGSCODE ACTUEEL"]] = print(i)
            #     print(len(rows))
            #     print(i)
            #
            # else:
            #     dict_number = opleidingscodes[rows[i]["OPLEIDINGSCODE ACTUEEL"]]
            #     print(rows[dict_number])

            # if not rows[i]["TYPE HOGER ONDERWIJS"] == "bachelor":
            #     del rows[i]



            if rows[i]["TYPE HOGER ONDERWIJS"] == "bachelor":
                opleidingscode = rows[i]["OPLEIDINGSCODE ACTUEEL"]
                writer.writerow([rows[i]["PROVINCIE"],rows[i]["GEMEENTENAAM"],
                                rows[i]["TYPE HOGER ONDERWIJS"],
                                rows[i]["INSTELLINGSNAAM ACTUEEL"], rows[i]["OPLEIDINGSCODE ACTUEEL"],
                                rows[i]["OPLEIDINGSNAAM ACTUEEL"],
                                opleidingscodes[opleidingscode]["2013 MAN"],
                                rows[i]["2013 VROUW"],
                                rows[i]["2014 MAN"],
                                rows[i]["2014 VROUW"],
                                rows[i]["2015 MAN"],
                                rows[i]["2015 VROUW"],
                                rows[i]["2016 MAN"],
                                rows[i]["2016 VROUW"],
                                rows[i]["2017 MAN"],
                                rows[i]["2017 VROUW"]])

        # if rows[i]["GEMEENTENAAM"] not in steden:
        #     steden.append(rows[i]["GEMEENTENAAM"])

        # if not rows[i]["SOORT INSTELLING"] == "reguliere inst.":
        #     print(rows[i])






    # print(output)

    # out_file2.write(rows)

    return "jeej"

if __name__ == "__main__":
    json_file = convert_csv_json()
