var Funnel = require('broccoli-funnel');
var compileLESS = require('broccoli-less');
var cleanCSS = require('broccoli-clean-css');
var uglifyJS = require('broccoli-uglify-js');
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');

var bower = Funnel('bower_components', { destDir: 'bower_components' });

var images = 'src/images';
images = Funnel(images, { destDir: 'images' });

var fonts = 'src/fonts';
fonts = Funnel(fonts, { destDir: 'fonts' });

var css = 'src/css';
css = compileLESS(css, { paths: ['src/css'] });
css = cleanCSS(css, {
  processImport: true,
  processImportFrom: ['!fonts.googleapis.com']
});
css = Funnel(css, { destDir: 'css' });

var js = 'src/js';
js_ = concat(mergeTrees([js, bower]), {
  outputFile: 'script.js',
  // header: ";(function() {",
  // footer: "})();",
  headerFiles: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/featherlight/src/featherlight.js',
    'bower_components/featherlight/src/featherlight.gallery.js',
    'lib/video-thumbs.js',
    'vendor/hoverIntent.js',
    'vendor/superfish.js',
    'vendor/jquery.slicknav.js',
    'vendor/isotope.pkgd.js',
    'vendor/imagesloaded.pkgd.js',
    'vendor/conditionizr.js',
    // 'vendor/safari.js',
    // 'vendor/windows.js',
    'vendor/jquery.infinitescroll.js',
    'vendor/manual-trigger.js',
  ],
  inputFiles: [],
  footerFiles: ['custom-infscroll-auto.js'],
  allowNone: true,
});
js_ = uglifyJS(js_);
js = mergeTrees([js, js_]);
js = Funnel(js, { destDir: 'js', exclude: ['bower_components'] });

module.exports = mergeTrees([images, fonts, css, js]);
