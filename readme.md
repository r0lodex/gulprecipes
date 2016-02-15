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
- Adapt your project structure in `gulpfile.js`. Change the directory as you see fit.
- Just run `gulp` to start the task runner, and `gulp watch` to run everytime you save.
- For the time being, only existing files will be watched. For newly created files, you gotta restart `gulp watch`.

#### Todo
- Watch newly created files.
- Opinionated project structure, e.g Boilerplate this with:
    + Angular (John Papa)
    + Bootstrap 4 Alpha
    + Iconsets
    + Fonts