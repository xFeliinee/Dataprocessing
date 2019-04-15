#!/usr/bin/env python
# Name: Feline Benavides
# Student number: 11035358
"""
This script does something :)

Thanks to:
https://www.datacamp.com/community/tutorials/pandas-read-csv
All pandas videos of https://www.youtube.com/user/DrNoureddinSadawi/videos
pandas 0.24.2 documentation

Set index shit:
https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.set_index.html

"""
import pandas as pd
import csv
import json
import matplotlib.pyplot as plt


if __name__ == "__main__":

        # Load in CSV file and set Country as first column
        df = pd.read_csv("input.csv", na_values = "unknown", decimal = ",")
        df = df.set_index("Country")

        # Compute and print the mean, median and mode of the GDP data
        df["GDP ($ per capita) dollars"] = df["GDP ($ per capita) dollars"].str.replace("dollars", "")
        df["GDP ($ per capita) dollars"] = pd.to_numeric(df["GDP ($ per capita) dollars"], downcast = "float")
        GDP_mean = df["GDP ($ per capita) dollars"].mean()
        GDP_median = df["GDP ($ per capita) dollars"].median()
        GDP_mode = int(df["GDP ($ per capita) dollars"].mode())
        # print(f"For the Gross Domestic Product (GDP) per capita in dollar the mean is {GDP_mean}, the median is {GDP_median} and the mode is {GDP_mode}.")

        # Produce a histogram of the GDP data
        df["GDP ($ per capita) dollars"].plot.hist()
        plt.title('Gross Domestic Product (GDP) per capita', \
                    color = 'g', fontsize = 14)
        plt.ylabel('Frequency', color = 'g')
        plt.xlabel('Dollars', color = 'g')
        # plt.show()

        # Compute and print the Five Number Summary of the Infant Mortality data
        min = df["Infant mortality (per 1000 births)"].min()
        max = df["Infant mortality (per 1000 births)"].max()
        median = df["Infant mortality (per 1000 births)"].median()
        quantile_25 = df["Infant mortality (per 1000 births)"].quantile(0.25)
        quantile_75 = df["Infant mortality (per 1000 births)"].quantile(0.75)
        # print(f"The minimum for the Infant Mortality data is {min} and maximum is {max}. The median is {median}, the 25% quantile is {quantile_25} and the 75% quantile is {quantile_75}.")

        # Produce a box plot of the Infant Mortality data
        df.boxplot(["Infant mortality (per 1000 births)"])
        plt.title('Box plot for infant mortality', \
                    color = 'g', fontsize = 14)
        plt.ylabel('Infant mortality', color = 'g')
        plt.xlabel('')
        # plt.show()

"""
    TODO
V Load in the CSV file?
V (think so) Clean and preprocess the data?
V Compute AND print the mean, median and mode of the GDP data?
V Produce a histogram of the GDP data?
V Compute AND print the Five Number Summary of the Infant Mortality data?
V Produce a box plot of the Infant Mortality data?
Write a .json file in the correct format?
"""
        # Write a .json file in the correct format
        data = df.to_json("hello.json", orient = "index")
        #.set_index(Region)?
