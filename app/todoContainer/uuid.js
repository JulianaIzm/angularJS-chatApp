'use strict';

angular.module('myApp.service', [])
.factory('uuid', function() {
    var svc = {
        new: function() {
            var p = (Math.floor(Math.random() * 100));
            return p;
        }
    };
    
    return svc;
});