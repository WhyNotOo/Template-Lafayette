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
	          $('#brands').append('<article class="brand" data-url="'+brand['gsx:url']+'"><p class="img" style="background-image: url('+brand['gsx:image']+');"</p><h2>'+brand.name+'</h2></article>')
	        });
	        app.resizeItem();
	      }
	    });

	    setTimeout(app.displayBrand, 2000);
	  }
  },

  displayBrand: function() {
  	$('.loader').addClass('hidden');
  	$('#brands').removeClass('invisible');
    scroller = new iScroll('container', { hScroll: false, hideScrollbar: false, scrollbarClass: 'scrollbar' });

    // for(var i=0; i<100; i++) {
    //   var test = 0;
    //   if(i%3 == 0 && i%5 == 0) {
    //     test = 'FizzBuzz';
    //   } else if(i%5 == 0) {
    //     test = 'Buzz';
    //   } else if(i%3 == 0) {
    //     test = 'Fizz';
    //   } else {
    //     test = i;
    //   }
    //   console.log(test);
    // }
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
      $('.app-header').css('background', options.backgroundheader);
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
$('.brand').live('click', function() {
  var url = $(this).attr('data-url');
  console.log(url);
});



// --- LAUNCH APP --- \\
$(document).ready(function() {
  app.addCustomConfig();
  $(window).resize(app.onResize);
});

})(jQuery);