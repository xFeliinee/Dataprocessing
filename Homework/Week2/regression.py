#!/usr/bin/env python
# Name: Feline Benavides
# Student number: 11035358
"""
Extra opdracht: hoeft niet nagekeken te worden, maar als jullie tijd hebben
om naar de methode te kijken, is dat top :).

"""

import pandas as pd
import csv
import json
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import itertools
from matplotlib import markers
import random


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

    # Random genereren van kleur per regio, verandert iedere run
    categories = np.unique(df["Region"])
    number_of_colors = len(categories)
    colors = ["#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)])
                 for i in range(number_of_colors)]
    colordict = dict(zip(categories, colors))
    df["Color"] = df["Region"].apply(lambda x: colordict[x])

    # Plot the data
    df.plot.scatter("Birthrate", "Deathrate", c=df.Color)
    plt.legend(colordict)

    # Calculating correlation and plotting
    correlation = df[["Birthrate", "Deathrate"]].corr(method='pearson')
    x = np.array(range(10, 50))
    y = 0.395302 * x
    plt.plot(x, y, color = "k")

    plt.show()
