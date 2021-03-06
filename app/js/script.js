/* Author:
 * Kevin ALBESSARD
 */

(function ($) {

var config  = Joshfire.factory.config.app,
		options = Joshfire.factory.config.template.options || {},
  	brands  = Joshfire.factory.getDataSource("brands"),
  	scroller, iconstyle;

var app = {

  searchBrands: function() {
  	if(brands) {
	    brands.find({}, function (err, data) {
	      if(err) {
	        console.log('erreur : '+err);
	        alert('Une erreur est survenue pendant le chargement de l\'application. Merci de recharger la page.');
	      } else {
	        $.map(data.entries, function (entry, idx) {
	          $('#brands').append('<article class="brand '+iconstyle+'" data-url="'+entry.url+'" onclick=""><p class="img" style="background-image: url('+entry.image.contentURL+');"</p></article>')
	        });
	        app.resizeItem();
	      }
	    });

	    $(window).load(function() {
        app.displayBrand();
      });
	  }
  },

  displayBrand: function() {
  	$('#loader').addClass('hidden');
  	$('#brands').removeClass('invisible');
    scroller = new iScroll('container', { hScroll: false, hideScrollbar: false, scrollbarClass: 'scrollbar' });

    // --- Open the detailled app of the brand --- \\
    $('.brand').on('click', function() {
      var url = $(this).attr('data-url');
      if(url)
        window.location.href = url;
    });
  },

  addCustomConfig: function() {
    var cl = new CanvasLoader('loader');
    cl.setShape('spiral');
    cl.setDiameter(50);
    cl.setDensity(43);
    cl.setRange(0.9);
    cl.setFPS(27);
    cl.show();

    if(config.name) {
      $('title').html(config.name);
    }

    if(config.icon) {
      $('head').append('<link rel="apple-touch-icon-precomposed" href="'+ config.icon.contentURL +'"><link rel="shortcut icon" href="'+ config.icon.contentURL +'">');
    }

    if(config.logo) {
    	$('.app-header .logo').css('background-image', 'url('+config.logo.contentURL+')');
    }

    if(options.backgroundimage) {
    	$('#container').css('background-image', 'url('+options.backgroundimage+')');
    }

    if(options.backgroundheader) {
      $('.app-header').css('background-color', options.backgroundheader);
    }

    if(options.iconstyle) {
      iconstyle = options.iconstyle || 'basic';
    }

    app.searchBrands();
  },

	resizeItem: function() {
		var brandW = $('.brand').width();
		$('.brand').height(brandW+'px');
  },

  onResize: function() {
		app.resizeItem();
		scroller.refresh();
  }

};
// --- END APP --- \\



// --- LAUNCH APP --- \\
$(document).ready(function() {
  app.addCustomConfig();
  $(window).resize(app.onResize);
});

})(jQuery);