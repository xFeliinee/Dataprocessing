#!/usr/bin/env python
# Name: Feline Benavides
# Student number: 11035358
"""
This script converts a csv file into a json file. In this dataset temp is in
0.1 Celsius.

To use in future projects:
pd.read_csv can be used without index_col and with a sep as default ','
to_json can be used using index, records, values, table and columns

Validation via: https://jsonlint.com/

"""

import csv
import json
import pandas as pd

if __name__ == "__main__":
    df = pd.read_csv("hpi_data.csv", sep = ";", na_values = "Data unavailable", skipinitialspace = True, index_col = "Country")
    df.to_json("HPI_data.json", orient = "index")
