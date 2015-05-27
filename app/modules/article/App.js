define('article', function() {
    "use strict";
    console.log('Required article');
    var Article = {
        init: function(data, view) {
            view.render(data);
            jQuery('#' + view.rowId + ' .module__article').html(data.content);
            console.log('initialised ' + data.moduleName);
        }
    };

    return Article;

});