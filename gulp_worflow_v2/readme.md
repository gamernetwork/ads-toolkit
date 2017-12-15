# a_ Advert Creation Template

A template created to facilitate the quick creation and deployment of ad-creatives

## Getting Started 

1: Clone the 'a_template_file'
2: Navigate to the 'app' folder, this is the folder used for local development.
3: Within 'app' there are a number of folders and files already, to get started: 'index.html' is the primary development file, 'sass/styles.sass' is the styling file and 'js/main.js' is the main js file.
NOTE: The template comes with some css / js dependancies as standard, these provide some useful functionality for ad-creative devlopment, but are totally optional. See 'a_' functionality below for details.

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
-Auto Compiling CSS pre-processors such as sass and less
-Running a local live server that will automatically refresh the browser when any changes are made to the creative
-Auto prefixing CSS
-Minifying CSS / Javascript
-Concatenating external stylesheets and scripts
-Inserting the resulting single stylesheet and script into internal stylesheets ready for deployment
-Auto Optimizing Images 
-Generating LQIP / SQIP images for progressive image loading
```

### Folder Structure 

```
During local development, use the app/css, app/js and app/index.html
The final creative can be found in final-build/index.html
```

## Usage 

```
-CD Into 'a_template_file'
-Run gulp watch to start listening for changes are boot up the local server, this will open a browser tab in your default browser
-Develop creative as normal, Sass will auto-compile to CSS, Babel will auto transpile to Javascript and the results will be displayed live
-When the creative is finished, run gulp build. This will create new js/css/html files in dist, concatenate scripts and stylesheets, auto-prefix css, compress images and 
```

