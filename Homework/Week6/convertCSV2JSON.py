#!/usr/bin/env python
# Name: Feline Benavides
# Student number: 11035358
"""
This script converts a csv file into a json file. In this case the .json file
has an index of country codes.

Validation via: https://jsonlint.com/

"""

import csv
import json
import pandas as pd

if __name__ == "__main__":
    df = pd.read_csv("hpi_data.csv", sep = ";", \
                     na_values = "Data unavailable", \
                     skipinitialspace = True, index_col = "Code")
    df.to_json("HPI_data.json", orient = "index")
