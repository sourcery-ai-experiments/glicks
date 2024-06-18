# Glicks Heimishe Bakery

## Glicks bakery

Glicks bakery started off in someones home in Jerusalem and is now setting up a small location for baking and they deliver their goods.
The bakery serves Jerusalem neighberhoods and takes orders from anyone, anywhere but as mentioned delivers only
within Jerusalem.

## The site

This is a simple static website with a few static webpages.
The site is a Catelogue for the developing bakery 'Glicks'.
The items are saved in json files in the assets/data directory and imported as needed.

The main page displays all items devided into categories.
They will be partially displayed with the rest shown on a seperate page for each category.

### Filters

The items can be filtered by category and by Milk/Parve status.

## How items and categories will be added:

Items will only be added by developers, by pulling the repo and running the site locally.
In a local enviroment, there is an admin interface at /admin and netlify functions for making api requests. In the admin interface items, categories, and tags can be added, edited, or removed.

### How to use admin interface locally

After pulling the repo a `.env` file has to be create with the following code:

```
VITE_LOCAL_ENV=true
```

### Note

The admin inteface is ***not*** available in the netlify deploys (it is removed
when the deploys gets built; see [package.json](/package.json) and [netlify.toml]
(/netlify.toml)).

## What the Site Won't Have for the Forseeable Future

#### Per Client's Request:

- The site will not have a login page or any kind of back end functionalities.
- The site will not have any ordering logic; there will only be contact info and
  item info.
- The site will not have any kind of payment functionality.

## The site might have

- The site might have a search function but limited to the front end

## Other info about this project

The App loads the page according to [router.js](/src/router.js)
