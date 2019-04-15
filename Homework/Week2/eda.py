#!/usr/bin/env python
# Name: Feline Benavides
# Student number: 11035358
"""
This script does something :)

Thanks to:
https://www.datacamp.com/community/tutorials/pandas-read-csv
All pandas videos of https://www.youtube.com/user/DrNoureddinSadawi/videos

Set index shit:
https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.set_index.html

"""
import pandas as pd
import csv
import json
import matplotlib.pyplot as plt


if __name__ == "__main__":

        # Load in CSV file
        df = pd.read_csv("input.csv", na_values = "unknown", decimal = ",")
        df = df.set_index("Country")

        # Compute and print the mean, median and mode of the GDP data
        df["GDP ($ per capita) dollars"] = df["GDP ($ per capita) dollars"].str.replace("dollars", "")
        df["GDP ($ per capita) dollars"] = pd.to_numeric(df["GDP ($ per capita) dollars"], downcast = "float")
        # print(df["GDP ($ per capita) dollars"].mean())
        # print(df["GDP ($ per capita) dollars"].median())
        # print(df["GDP ($ per capita) dollars"].mode())

        # Produce a histogram of the GDP data
        ax = df["GDP ($ per capita) dollars"].plot.hist()
        plt.show()

        # Compute and print the Five Number Summary of the Infant Mortality data


# V Load in the CSV file?
# V (think so) Clean and preprocess the data?
# V Compute AND print the mean, median and mode of the GDP data?
# V Produce a histogram of the GDP data?
# Compute AND print the Five Number Summary of the Infant Mortality data?
# Produce a box plot of the Infant Mortality data?
# Write a .json file in the correct format?


        data = df.to_json("hello.json", orient = "index")

        #.set_index(Region)?
        # print(df.head())
        # print(data)
        print("Gerund!")
        # print(data.head(5))
        # print(data[["Population"]].mean())
        # dubbele brackets: 1 voor PY, 1 voor pd (selecting column)
        # check = data[["Agriculture"]].replace(' ', np.NaN)
        # print(sum(check.isnull().sum()))
        # print(data['Agriculture'])
        # print(statistics.mean(data['Agriculture']))

        # Central tendency
        # median, modus and mean
