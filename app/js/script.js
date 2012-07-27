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
	          $('#brands ul').append('<li class="brand"><img src="'+brand['gsx:image']+'" alt="'+brand.name+'" /><h2>'+brand.name+'</h2></li>')
	        });
	        app.resizeItem();
	      }
	    });

	    setTimeout(app.displayBrand, 1000);
	  }
  },

  displayBrand: function() {
  	$('.loader').addClass('hidden');
  	$('#brands').removeClass('invisible');
    scroller = new iScroll('brands', { hScroll: false, hideScrollbar: false, scrollbarClass: 'scrollbar' });
    console.log(scroller);
  },

  addCustomConfig: function() {
    if(config.icon) { }

    if(config.logo) {
    	$('.app-header .logo').css('background-image', 'url('+Joshfire.factory.config.app.logo.contentURL+')');
    }

    if(options.backgroundimage) {
    	$('#container').css('background-image', 'url('+options.backgroundimage+')');
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



// --- ACTIONS --- \\



// --- LAUNCH APP --- \\
$(document).ready(function() {
  app.addCustomConfig();
  $(window).resize(app.onResize);
});

})(jQuery);