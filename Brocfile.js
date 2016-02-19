var Funnel = require('broccoli-funnel');
var compileLESS = require('broccoli-less');
var cleanCSS = require('broccoli-clean-css');
var uglifyJS = require('broccoli-uglify-js');
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');

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

var vendor_js = Funnel('bower_components', { destDir: 'bower_components' });
vendor_js = concat(vendor_js, {
  outputFile: 'vendor.js',
  headerFiles: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/featherlight/src/featherlight.js',
    'bower_components/featherlight/src/featherlight.gallery.js',
    'bower_components/jquery-hoverintent/jquery.hoverIntent.js',
    'bower_components/superfish/dist/js/superfish.js',
    'bower_components/slicknav/jquery.slicknav.js',
    'bower_components/isotope/dist/isotope.pkgd.js',
    'bower_components/imagesloaded/imagesloaded.pkgd.js',
    'bower_components/conditionizr/dist/conditionizr.js',
    'bower_components/conditionizr/detects/safari.js',
    'bower_components/conditionizr/detects/windows.js',
    'bower_components/jquery-infinite-scroll/jquery.infinitescroll.js',
    'bower_components/jquery-infinite-scroll/behaviors/manual-trigger.js',
  ],
  inputFiles: [],
  allowNone: true,
});
vendor_js = uglifyJS(vendor_js);

var js_src = 'src/js';
js = concat(js_src, {
  outputFile: 'script.js',
  // header: ";(function() {",
  // footer: "})();",
  headerFiles: [
    'lib/video-thumbs.js',
  ],
  inputFiles: [
    'custom-infscroll-auto.js'
  ],
});
js = uglifyJS(js);
js = mergeTrees([js, js_src, vendor_js]);
js = Funnel(js, { destDir: 'js' });

module.exports = mergeTrees([images, fonts, css, js]);
