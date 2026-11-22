# SSG Exercise (Eleventy)

This folder uses [Eleventy](https://www.11ty.dev/) to generate two pages from my portfolio: **Home** and **About**. Both pages share one footer, written once in its own include file.

Requires Node.js 18 or newer.

## Install
```
cd ssg-exercise
npm install
```

## Build
```
npx @11ty/eleventy
```
The built pages are written to the `_site/` folder.

## Preview
```
npx @11ty/eleventy --serve
```
- Home: http://localhost:8080/
- About: http://localhost:8080/about.html

## Shared Section
The shared footer is in `_includes/footer.njk`. Both `index.njk` (Home) and `about.njk` (About) insert it with `{% include "footer.njk" %}`, so the footer only exists in one place.

To check it, edit the text in `_includes/footer.njk`, rebuild (or let `--serve` rebuild on save), and refresh both pages. Both pages show the change.
