#!/usr/bin/env python
# Name: Feline Benavides
# Student number: 11035358
"""
This script scrapes IMDB and outputs a CSV file with highest rated movies.
"""

import csv
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

TARGET_URL = "https://www.imdb.com/search/title?title_type=feature&release_date=2008-01-01,2018-01-01&num_votes=5000,&sort=user_rating,desc"
BACKUP_HTML = 'movies.html'
OUTPUT_CSV = 'movies.csv'


def extract_movies(dom):
    """
    Extract a list of highest rated movies from DOM (of IMDB page).
    Each movie entry should contain the following fields:
    - Title
    - Rating
    - Year of release (only a number!)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)

    For isdigit use #61 and #80, thanks to:
    https://stackoverflow.com/questions/26825729/
    extract-number-from-string-in-python

    For BeautifulSoup4 documentation:
    https://www.crummy.com/software/BeautifulSoup/bs4/doc/

    """
    # Getting all the relevant content
    contents = dom.findAll("div", {"class": "lister-item-content"})
    movies = []

    # Looping over all movies
    for content in contents:

        # making a dictionary for this movie
        dictionary = {}

        # Finding the title, indexing the array and strip down to text
        searching_titles = content.find('h3')
        searching = searching_titles.findAll('a')[0]
        title = searching.get_text()
        dictionary.update({'title' : title})

        # Finding the ratings and indexing the data-value/rating
        rating = content.find("div", \
                                {"class": "inline-block ratings-imdb-rating"})
        dictionary.update({'rating' : rating['data-value']})

        # Finding the release year, indexing the array, strip down to int
        year = content.findAll('span', {'class' : \
                                'lister-item-year text-muted unbold'})[0]
        year = year.get_text()
        year = int(''.join(filter(str.isdigit, year)))
        dictionary.update({'year' : year})

        # Finding the stars and making array for actors
        stars = content.select('a[href*="_st_"]')
        actors = []

        # Loop for every actor, strip down to text and append to array
        for star in stars:
            star = star.get_text()
            actors.append(star)

        # Join actors together in string and update dictionary
        actors = ", ".join(actors)
        dictionary.update({'actors' : actors})

        # Finding the runtime, indexing the array, strip down to int
        runtime = content.findAll('span', {'class' : 'runtime'})[0]
        runtime = runtime.get_text()
        runtime = int(''.join(filter(str.isdigit, runtime)))
        dictionary.update({'runtime' : runtime})

        movies.append(dictionary)

    return movies


def save_csv(outfile, movies):
    """
    Output a CSV file containing highest rated movies.
    """
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Year', 'Actors', 'Runtime'])

    # loop over all dictionaries and fill all rows in CSV file
    for movie in movies:
        writer.writerow([movie["title"], movie["rating"], movie["year"],
                        movie["actors"], movie["runtime"]])


def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        print('The following error occurred during HTTP GET request to \
                {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


if __name__ == "__main__":

    # get HTML content at target URL
    html = simple_get(TARGET_URL)

    # save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    dom = BeautifulSoup(html, 'html.parser')

    # extract the movies (using the function you implemented)
    movies = extract_movies(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'w', newline='') as output_file:
        save_csv(output_file, movies)
