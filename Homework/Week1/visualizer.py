#!/usr/bin/env python
# Name: Feline Benavides
# Student number: 11035358
"""
This script visualizes data obtained from a .csv file
"""

import csv
import matplotlib.pyplot as plt

# Global constants for the input file, first and last year
INPUT_CSV = "movies.csv"
START_YEAR = 2008
END_YEAR = 2018

# Global dictionaries for the data
data_dict = {str(key): [] for key in range(START_YEAR, END_YEAR)}
averages = {str(key): [] for key in range(START_YEAR, END_YEAR)}

if __name__ == "__main__":

    # open the movies.csv file and write into dictionary
    with open(INPUT_CSV) as csvfile:
        plot_movies = csv.DictReader(csvfile)

        for row in plot_movies:
            data_dict[row['Year']].append(float(row['Rating']))

    # making average per year
    for k, v in data_dict.items():
        averages[k] = sum (v)/float(len(v))

    # plotting the average ratings of the movies
    ratings = sorted(averages.items())
    x, y = zip(*ratings)
    plt.plot(x, y, 'g-', x, y, 'ro')
    plt.ylabel('Average Rating', color = 'g')
    plt.xlabel('Year of release', color = 'g')
    plt.title('Average rating for a movie in top 50 of IMDB 2008-2017', \
                color = 'r', fontsize = 14)
    plt.ylim(8,9)
    plt.show()
