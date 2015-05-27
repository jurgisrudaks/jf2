define('image', function() {
    "use strict";
    console.log('Required Image');
    var Image = {
        init: function(data, view) {
            view.render(data);
            console.log('initialised ' + data.moduleName);
        }
    };

    return Image;

});