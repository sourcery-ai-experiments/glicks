# Glicks Heimishe Bakery

## Glicks bakery
Glicks bakery is a bakery that started off in someones home in Jerusalem and is now setting up a small location for baking and they deliver their goods. 
The bakery serves Jerusalem neighberhoods and takes orders from anyone but as mentioned delivers only
in Jerusalem.

## The site
This is a simple static website with one or more static webpages.
The site is a Catelogue for a developing bakery 'Glicks'.
The items are saved in a json files in the assets/data directory and imported as needed.

The main page will display all items devided into categories, and
they will only be partially displayed and the rest will be displayed in a seperate page for each category.

### Filters
The items can be filtered by category - meaning only items with there selected categories will display - and
by Milk/Parve status.

## How items and categories will be added:
Items will only be added by developers, by pulling the repo and running the site locally.
In a local enviroment there is available an admin interface at /admin and netlify functions for making api 
requests and in the admin interface items can be added edited or removed also categories and tags can be added
and removed.

### Note this:
The admin inteface is ***not*** available in the netlify deploys (it is removed when the deploys gets built see [package.json](/package.json)) see also the [netlify.toml](/netlify.toml) file.

## What the site won't have for the forseeable
#### Per clients request:
- The site will not have a login page or any kind of back end functionalities.
- The site will not have any ordering logics whatsoever there will only be contact 
info and item info.
- The site will not have any kind of payment functionality.

## The site might have
- The site might have a search function but limited to front end


## Other info about this project
The App loads the page according to [router.js](/src/router.js)

