/* Author:
 * Kevin ALBESSARD
 */

(function ($) {

var options = Joshfire.factory.config.template.options || {},
  	brands  = Joshfire.factory.getDataSource("brands");

var app = {

  displayBrands: function() {
  	if(brands) {
	    brands.find({}, function (err, data) {
	      if(err) {
	        console.log('erreur : '+err);
	        alert('Une erreur est survenue pendant le chargement de l\'application. Merci de recharger la page.');
	      } else {
	        $.map(data.entries, function (entry, idx) {
	          var brand = entry.entries;
	          console.log(brand);

	        });
	      }
	    });
	  }
  },

  addCustomConfig: function() {
    if(Joshfire.factory.config.app.icon) {

    }

    if(Joshfire.factory.config.app.logo) {

    }

    app.displayBrands();
  },

};
// --- END APP --- \\



// --- ACTIONS --- \\



// --- LAUNCH APP --- \\
$(document).ready(function() {
  app.addCustomConfig();
});

})(jQuery);