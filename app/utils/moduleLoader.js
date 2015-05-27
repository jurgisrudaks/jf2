define(['templates'],function(Templates) {
    'use strict';

    var moduleLoader = {
        Model: null,
        Collection: null,
        View: null,
        ViewTracker: null,
        ModuleModel: function(options) {
            var Model = Backbone.Model.extend({});
            return Model;
        },
        ModulesView: function(options) {
            var self = this;
            var View = Backbone.View.extend({
                tagName: 'div',
                className: 'container',
                render: function() {
                    $('#main').append(this.el);
                    self.Collection.each(this.initModule, this);
                },
                initModule: function(module) {
                    var ModuleView = self.ModuleView({ model: module });
                    self.ViewTracker.push(ModuleView);
                    require([module.get('moduleName')], function(Module){
                        Module.init(module.toJSON(), ModuleView);
                    });
                },
                renderModule: function(view) {
                    console.log('adding');
                    var previousView = self.ViewTracker[self.ViewTracker.indexOf(view) - 1];
                    if(previousView !== undefined && (previousView.size === 'col-md-6' && view.size === 'col-md-6')) {
                        jQuery('#' + previousView.rowId).append(view.el);
                        console.log('50/50 row');
                    } else {
                        this.$el.append('<div id="' + view.rowId + '" class="row"></div>');
                        jQuery('#' + view.rowId).append(view.el);
                    }
                }
            });
            return new View(options);
        },
        ModuleView: function(options) {
            var View = Backbone.View.extend({
                moduleId: null,
                rowId: null,
                size: null,
                tagName: 'div',
                template: '',
                moduleName: null,
                initialize: function () {
                    this.moduleId = 'mid' + this.generateUniqueID();
                    this.rowId = 'rid' + this.generateUniqueID();
                    this.size = this.model.get('size');
                    this.moduleName = this.model.get('moduleName');
                    this.$el.attr("id", this.moduleId);
                    this.$el.attr("class", 'module__' + this.moduleName + ' ' + this.size);
                },
                render: function(data) {
                    console.log('rendering...');
                    if(Templates[this.moduleName]) {
                        this.template = Templates[this.moduleName](data);
                    } else {
                        this.template = "No template file found for " + this.moduleName;
                    }
                    this.$el.html(this.template);
                    moduleLoader.View.renderModule(this);
                },
                generateUniqueID: function() {
                    return '_' + Math.random().toString(36).substr(2, 3);
                }
            });
            return new View(options);
        },
        ModulesCollection: function(options) {
            var Collection = Backbone.Collection.extend({
                model: this.Model
            });
            return new Collection();
        },
        loadModules: function(options) {
            
            // Check if all needed variables is defined so we dont unncessary define them again
            if(!this.Model) {
                this.Model = this.ModuleModel();
            }
            if (!this.Collection) {
                this.Collection = this.ModulesCollection();
            }
            if (!this.View) {
                this.View = this.ModulesView({ vent: options.vent, collection: this.Collection });
            }
            
            // Close existing module views
            _.forEach(this.ViewTracker, function(View, key) {
                View.close();
            });

            // Clear module view tracker and collection
            this.ViewTracker = [];
            
            // Add new modules
            if (options.data) {
                this.Collection.reset();
                this.Collection.add(options.data);
                this.View.render();
            } else {        
                this.View.close();
            }            
        }
    };

    return moduleLoader;

});
