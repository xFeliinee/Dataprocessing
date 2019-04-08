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
    """

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RATED MOVIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.

    content = dom.findAll("div", {"class": "lister-item-content"})
    print(content)
    for content in content:
        #content.findAll("div")
        # for a in content.findAll('a', href=True):
        #     print("Found the URL:", a['href'])

        # Getting the release dates
        dates = content.findAll('span', {'class' : 'lister-item-year text-muted unbold'})
        for date in dates:
            releases = [date.get_text() for date in dates]
        # print(releases)

        # Getting the titles
        searching_titles = content.find('h3')
        titles = searching_titles.findAll('a')
        for title in titles:
            halp = [title.get_text() for title in titles]
        # print(halp)

        # Getting ratings
        ratings = content.findAll("div", {"class": "inline-block ratings-imdb-rating"})
        for rating in ratings:
            real_ratings = [rating.get_text() for rating in ratings]
        # print(real_ratings)

        # Getting the stars
        # deze kan hij niet vinden op de een of andere manier?
        # unbound variable
        # stars = content.findAll('p', attrs={'class' : 'Stars'})
        # for star in stars:
        #     hello = [star.get_text() for star in stars]
        # print(hello)

        # Getting the Runtime
        # werkt nog niet?
        runtime = content.findAll('span', {'class' : 'runtime'})
        # for running in runtime:
        #     runningtime = [runtime.get_text() for running in runtime]
        # print (runningtime)



    # extracted_movies = []
    # for extraction in extractions:
    #     extracted_movies.append((titles, ratings, release_dates, actors, runtime))
    #print(dom.title)

    return [extracted_movies]   # REPLACE THIS LINE AS WELL IF APPROPRIATE


def save_csv(outfile, movies):
    """
    Output a CSV file containing highest rated movies.
    """
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Year', 'Actors', 'Runtime'])

    # write movies to CSV
    for titles, ratings, release_dates, actors, runtime in movies:
        writer.writerow([titles, ratings, release_dates, actors, runtime])
    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE MOVIES TO DISK


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
        print('The following error occurred during HTTP GET request to {0} : {1}'.format(url, str(e)))
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
