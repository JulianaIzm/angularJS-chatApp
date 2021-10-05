'use strict';

angular.module('myApp.toolbar', ['myApp.services']).
directive('toolbar', function(Response) {
    return {
      restrict: 'EA',
      templateUrl: 'chatApp/toolbar/toolbar.html',
      scope: {
        changeToQuestionButton: '<'
      },
      link: function(scope, element, attrs) {
        element.on('click', function() {
          Response.destroy();
        });
      }
    };  
});

