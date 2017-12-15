# a_ Advert Creation Template

A template created to facilitate the quick creation and deployment of ad-creatives

## Getting Started 
```
1: Clone this repo

2: Navigate to the 'app' folder, this is the folder used for local development.

3: Dev As Normal

NOTE: The template comes with some optional css / js dependancies as standard, 

See 'a_' functionality below for details.
```

### Requirements 

```
Node.js / NPM
Gulp 
GO For SQIP Generation
```

## Development 

### Gulp:

This template contains a gulp file with a number of useful tasks built in, they include:

```
- Auto Compiling CSS pre-processors such as sass and less

- Running a local live server that will automatically refresh 

- Auto prefixing CSS

- Minifying CSS / Javascript

- Concatenating external stylesheets and scripts

- Auto Creating internal stylesheets

- Auto Optimizing Images 

- Generating LQIP / SQIP images for progressive image loading
```

### Folder Structure 

```
During local development, use the app/css, app/js and app/index.html
The final creative can be found in final-build/index.html
```

## Usage 

```
- CD Into 'a_template_file'

- Run 'gulp watch' to start listening for changes and boot up the local server

- Develop creative as normal

- When the creative is finished, run 'gulp build'. Follow by 'gulp compile-ad'

- The final creative can be found in final-build/index.html
```

