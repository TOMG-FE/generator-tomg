/**
 * Created by echochi on 15/12/1.
 */

var $ = require('../../lib');
var $reuse = require('../ui/reuseDialog');

var cache = $reuse({
    template : '<div class="ui-login"><iframe role="loginFrame" src=""></iframe></div>',
    target : 'screen',
    parent : null,
    mask : true,
    styles: {
        'z-index': 10000,
        'width': '622px',
        'height': '368px'
    }
});

var loginDialog = {};

var loginLayer = {

    initLayer: function(opt) {

        loginDialog = cache.get();

        loginDialog.role('loginFrame');
        loginDialog.role('loginFrame').attr({'src': opt.url, 'style': 'width: 622px, height: 368px;'});

        loginDialog.show();
    },


    resizeLayer: function(width, height) {
        loginDialog.role('loginFrame').css({width: width + 'px', height: height + 'px'});
        loginDialog.role('root').css({width: width + 'px', height: height + 'px'});
    },

    closeLayer: function() {
        loginDialog.hide();
    }
};

module.exports = loginLayer;