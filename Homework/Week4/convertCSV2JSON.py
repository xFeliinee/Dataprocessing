#!/usr/bin/env python
# Name: Feline Benavides
# Student number: 11035358
"""
This script converts a csv file into a json file.

To use in future projects:
pd.read_csv can be used with index_col and with a separater (default = ',')
to_json can be used using index, records, values, table and columns

Validation via: https://jsonlint.com/

Processing the data: I set time to 2015, to only view values for that year.
In 'Value' were two measures stored, so I choose to display "PC_PRYENRGSUPPLY"

"""

import csv
import json
import pandas as pd

if __name__ == "__main__":
    df = pd.read_csv("data.csv", na_values = "unknown", skipinitialspace = True)
    df = df.loc[df["TIME"] == 2015]
    df = df.loc[df["MEASURE"] == "PC_PRYENRGSUPPLY"]
    df[["LOCATION", "Value"]].to_json("data.json", orient = "records")
