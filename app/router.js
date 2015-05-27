define(['backbone', 'app'], function(Backbone, app) {
    "use strict";

    // Defining the application router.
    var Router = Backbone.Router.extend({
        routes: {
            "": "index",
            '*slug': 'showPage'
        },
        index: function() {
            app.vent.trigger('page:index');
        },
        showPage: function(slug) {
            app.vent.trigger('page:show', slug);
        }
    });

    return Router;
});
