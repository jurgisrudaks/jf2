require.config({
    baseUrl: "app",
    paths : {
        "lodash": "../bower_components/lodash/dist/lodash",
        "jquery": "../bower_components/jquery/dist/jquery",
        "backbone": "../bower_components/backbone/backbone",
        "handlebars": "../bower_components/handlebars/handlebars",
        "bootstrap": "../bower_components/bootstrap-sass/assets/javascripts/bootstrap",
        "templates": "../build/js/templates"
    },
    shim : {
        "bootstrap" : { "deps": ['jquery'] }
    },
    map: {
        "backbone": {
            "underscore": "lodash"
        }
    }
});
