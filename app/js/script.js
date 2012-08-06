/* Author:
 * Kevin ALBESSARD
 */

(function ($) {

var config = Joshfire.factory.config.app,
		options = Joshfire.factory.config.template.options || {},
  	brands  = Joshfire.factory.getDataSource("brands"),
  	scroller;

var app = {

  searchBrands: function() {
  	if(brands) {
	    brands.find({}, function (err, data) {
	      if(err) {
	        console.log('erreur : '+err);
	        alert('Une erreur est survenue pendant le chargement de l\'application. Merci de recharger la page.');
	      } else {
	        $.map(data.entries, function (entry, idx) {
	          var brand = entry;
	          $('#brands').append('<article class="brand" data-url="'+brand['gsx:url']+'" onclick=""><p class="img" style="background-image: url('+brand['gsx:image']+');"</p><h2>'+brand.name+'</h2></article>')
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
  	$('.loader').addClass('hidden');
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
    if(config.icon) {  }

    if(config.logo) {
    	$('.app-header .logo').css('background-image', 'url('+Joshfire.factory.config.app.logo.contentURL+')');
    }

    if(options.backgroundimage) {
    	$('#container').css('background-image', 'url('+options.backgroundimage+')');
    }

    if(options.backgroundheader) {
      $('.app-header').css('background-color', options.backgroundheader);
    }

    app.searchBrands();
  },

	resizeItem: function() {
		var brandW = $('.brand').width();
		$('.brand').height(brandW+'px');
  },

  onResize: function() {
		var brandW = $('.brand').width();
		$('.brand').height(brandW+'px');
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