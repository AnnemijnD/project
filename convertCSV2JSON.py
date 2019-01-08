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
    in_file = open('eerstejaars.csv', 'r', encoding = "ISO-8859-1")
    # open('eerstejaars.csv', 'r')

    out_file = open('eerstejaars.json', 'w')

    # write rows
    reader = csv.DictReader(in_file, delimiter=';')
    rows = [row for row in reader]
    print(rows[1048])
    # for i in range(len(rows)):
    #     # print(i)
    #     if not rows[i]["TYPE HOGER ONDERWIJS"] == "bachelor":
    #         del rows[i]

    combine_dict = {"": []}
    for i in range(len(rows) - 1, -1, -1):
        if not rows[i]["SOORT INSTELLING"] == "reguliere inst.":
            print(rows[i])
        if not rows[i]["TYPE HOGER ONDERWIJS"] == "bachelor":
            del rows[i]







    # write jsonfile
    output = json.dumps(rows)
    out_file.write(output)
    return out_file

if __name__ == "__main__":
    json_file = convert_csv_json()
