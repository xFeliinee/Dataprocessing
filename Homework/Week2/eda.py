#!/usr/bin/env python
# Name: Feline Benavides
# Student number: 11035358
"""
This script loads, cleans and preprocesses input.csv. It computes the
central tendencies of the GDP data and produces a histogram of it. It also
computes the five number summary of the Infant Mortality data and produces
a box plot of it. At last a .json file is written.

I replaced the value for Suriname for GDP ($ per capita) collars to NaN,
because this value is not representive for the country (400000).


Thanks to:
https://www.datacamp.com/community/tutorials/pandas-read-csv
All pandas videos of https://www.youtube.com/user/DrNoureddinSadawi/videos
pandas 0.24.2 documentation
"""

import pandas as pd
import csv
import json
import matplotlib.pyplot as plt
import numpy as np


def central_tendancy(column):
    """
    Calculating the central tendancy values for the given column
    """
    mean = column.mean().round(1)
    median = column.median()
    mode = int(column.mode())

    return mean, median, mode


def fivenumber_sum(column):
    """
    Calculating the five number summary values for the given column
    """
    min = column.min()
    max = column.max()
    median = column.median()
    quantile_25 = column.quantile(0.25)
    quantile_75 = column.quantile(0.75)

    return min, max, median, quantile_25, quantile_75


if __name__ == "__main__":

    # Load in CSV file, set Country as first column and strip whitespace
    df = pd.read_csv("input.csv", na_values = "unknown", decimal = ",", \
                        index_col = "Country")
    df["Region"]= df["Region"].str.strip()

    # Pre-processing the data
    df["GDP ($ per capita) dollars"] = \
    df["GDP ($ per capita) dollars"].str.replace("dollars", "")
    df["GDP ($ per capita) dollars"] = \
    pd.to_numeric(df["GDP ($ per capita) dollars"], downcast = "float")
    df.at["Suriname ", "GDP ($ per capita) dollars"] = np.NaN

    # Compute and print Central Tendancy values of the GDP data
    mean, median, mode = central_tendancy(df["GDP ($ per capita) dollars"])
    print(f"For GDP in dollars for all countries: the mean is {str(mean)}," +
          f" the median is {median} and the mode is {mode}.")

    # Produce a histogram of the GDP data
    df["GDP ($ per capita) dollars"].plot.hist(ec = "white", color = "g")
    plt.title("Gross Domestic Product (GDP) per capita", \
                color = "g", fontsize = 14)
    plt.ylabel("Frequency", color = "g")
    plt.xlabel("Dollars", color = "g")
    plt.show()

    # Compute and print the Five Number Summary of the Infant Mortality data
    min, max, median, quantile_25, quantile_75 = \
    fivenumber_sum(df["Infant mortality (per 1000 births)"])
    print(f"For infant mortality per 1000 births: the minimum is {min}, " +
          f"the maximum is {max}, the median is {median}, the first quantile " +
          f"is {quantile_25} and the third quantile is {quantile_75}.")

    # Produce a box plot of the Infant Mortality data
    df.boxplot(["Infant mortality (per 1000 births)"], grid = False)
    plt.title("Infant Mortality per 1000 births", \
                color = "g", fontsize = 14)
    plt.ylabel("Per 1000 births", color = "g")
    plt.show()

    # Write a .json file in the correct format
    df[["Region", "Pop. Density (per sq. mi.)", \
        "Infant mortality (per 1000 births)", \
        "GDP ($ per capita) dollars"]].to_json("data.json", \
                                                orient = "index")
