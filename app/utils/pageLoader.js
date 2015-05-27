define(['utils/moduleLoader', 'templates'], function(ModuleLoader, Templates) {
    "use strict";

    var pageLoader = {
        PageModel: function() {
            var Model = Backbone.Model.extend({
                idAttribute: "_id",
                defaults: {
                    _id: null,
                    title: "Default page title",
                    slug: "default-slug"
                },
                urlRoot : '/api/v1/pages',
                fetchBySlug: function(){
                    this.unset('modules');
                    return this.fetch({
                        reset: true,
                        url: this.urlRoot + '/' + this.get('slug')
                    });
                }
            });
            return new Model();
        },
        PageView: function(options) {
            var View = Backbone.View.extend({
                el: $("#main"),
                model: options.model,
                initialize: function() {
                    options.vent.on('page:index', this.initPage, this);
                    options.vent.on('page:show', this.initPage, this);
                    this.render();
                },
                home: function() {
                    this.render();
                },
                render: function() {
                    // Here we can render some things which stay the same on all pages
                    var header = Templates.header({title: 'JF2'});
                    var footer = Templates.footer(this.model.get('footerModules'));
                    $('nav').append(header);
                    $('footer').append(footer);
                    return this;
                },
                initModuleLoader: function() {
                    var modules = this.model.get('modules');
                    ModuleLoader.loadModules({data: modules});
                },
                loading: function(bool) {
                    if (bool === true) {
                        $("#loading").slideDown(500, function() {
                            $('#main .container').slideUp(500);
                        });                      
                    } else {
//                        $('#loading').fadeOut(1000).slideUp();
                        $("#loading").slideUp(500, function() {
                            $('#main .container').slideDown(500);
                        });
                    }
                    
                },
                initPage: function(slug) {
                    console.log('Fetching data');
                    var self = this;
                    this.loading(true);
                    setTimeout(function () {
                        if (slug) {
                            self.model.set('slug', slug);
                        } else {
                            self.model.set('slug', 'test1');
                        }
                        self.model.fetchBySlug().done(function() {
                            self.initModuleLoader();
                            self.loading(false);
                        });
                    }, 1000);
                }
            });
            return new View();
        }
    };

    return pageLoader;
});
