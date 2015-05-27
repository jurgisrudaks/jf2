define(['backbone', 'utils/pageLoader', 'bootstrap'], function(Backbone, PageLoader) {
    "use strict";

    Backbone.View.prototype.close = function () {
        console.log('Unbinding events for ' + this.cid);
        if(this.$el.parent().attr('id') !== 'main') {
            this.$el.parent().remove();
        }
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };
    
    var vent = _.extend({}, Backbone.Events);

    var app = {
        page: {
            model: null,
            view: null
        },
        root: "/",
        vent: vent
    };
    
    app.page.model = PageLoader.PageModel();
    app.page.view = PageLoader.PageView({ model: app.page.model, vent: vent });

    // The root path to run the application through.
    return app;
});
