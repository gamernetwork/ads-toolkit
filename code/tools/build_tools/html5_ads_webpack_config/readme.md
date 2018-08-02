# HTML5 Creative Webpack Config 

This is quite a nice basic webpack setup for making HTML5 zips. It has a few useful features like: 

+ SCSS Integration
+ Babel 
+ An autoprefixer 
+ A minifier 
+ Auto-injects css / js into internal `<script>` and `<style>` tags
+ Will auto-output a .zip file on build
+ JS Linting based on standard js (with a few modifications... I like semicolons and the occasional unary operator!)

## Installation 

+ `git clone`
+ `cd html5_ad_webpack_config`
+ `npm install`

## Usage

+ `npm run dev` for development 
+ `npm run build` for production

`npm run build` will output two new folders `dist` and `dist_zip`. 
`dist` contains bundled versions of all css / js as well as an assets folder and index.html. 
The index.html file will be exactly the same as the one included in the final .zip, as will the assets folder. 
`dist` therefore, is a nice way of checking on the code included in `dist_zip` without opening it up. 
The bundled .css / .js files found in `dist` will NOT be included in `dist_zip`

## Tests 





