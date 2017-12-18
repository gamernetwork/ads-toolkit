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

- Auto transpiling Babel to cross-compatible javascript.
```

### Folder Structure 

```
During local development, use the app/css, app/js and app/index.html
The final creative can be found in final-build/index.html
NOTE: Write javascript in babel.js please, it dosent have to be babel, but it does have to be in there.
```

## Usage 

```
- CD into 'a_template_file'

- Run 'gulp watch' to start listening for changes and boot up the local server

- Develop creative as normal using the provided folders and file paths (app/)

- When the creative is finished, run 'gulp build'. Follow by 'gulp compile-ad'

- The final creative can be found in final-build/index.html
```

## a_ Functionality 

The a_ libraries contain a selection of features created to hopefully aid in developing 
more consistent and performant ads. The following is a breakdown of those features. 

### HTML / CSS

#### Wrappers: 

```
- Each creative is contained within a 'wrapper'. There are 5 wrapper classes that may be used: 

	- 'a_eg-leaderboard-wrapper'
	- 'a_mod-leaderboard-wrapper'
	- 'a_push-leaderboard-wrapper'
	- 'a_300x600-halfpage-wrapper'
	- 'a_300x1050-halfpage-wrapper'

- These classes will automatically be appended with a block level click through link as before. 

- To add a background image, add a 'data-background="___"' attribute to the div 
```

#### Link Binding:

```
- When working with layered elements and animations, a single click-through link can be a pain to handle.
  To resolve this, add the 'a_click-through-wrap' class to content that needs to link to the clickthrough url.

- Similarly to 'a_click-through-wrap', elements that are part of an autoplaying video section can be given the 
  'a_video-link-wrap' class, to ensure that they open the video overlay when clicked.
```

#### Animations: 

```
- a_ comes with some standard commonly used animations. To add an animation to an object, just give it an animation 
  class, these classes are: 

  - 'a_fade-in'
  - 'a_fade-in-left'
  - 'a_fade-in-right'
  - 'a_fade-in-up'
  - 'a_fade-in-down'

  (Disney would be proud!)

- a_ automatically handles animation states, so that animations will pause when the browser is not focused on the 
  iframe, the iframe is out of view, or the creatives content has not yet loaded. 
```

#### Hover States: 

```
- These work the same as animations, classes include: 
	- 'a_brightness-hover'
	- 'a_scale-hover'
	- 'a_float-hover'
```
