# Gulp Recipe
This recipe is my opinion on managing frontend development using Gulp with teams. I was used to using CodeKit which is not free and available only on OS X, this recipe is good for frontend teams on other platforms.

What this does
- Concatenate & minify javascripts
- Compile SASS
- Compress images

### Requirements
- Gulp `npm install -g gulp-cli`
- Browserify `npm install -g browserify`
- Watchify `npm install -g watchify`
- SASS `gem install sass`
- LiveReload

### Usage
- `npm install --save-dev`
- `gulp watch`
- Adapt your project structure in `gulpfile.js`. Change the directory as you see fit.

#### Todo
Basically I'll make this repo as my boilerplate. Probably will contain more advance modules in the future, e.g;
- Angular
    + ui-router
    + angular-resource
- Bootstrap 4
- etc.