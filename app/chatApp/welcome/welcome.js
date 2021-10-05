'use strict';

angular.module('myApp.welcome', [])
.directive('welcome', function() {
    return {
      restrict: 'E',
      require: '^startButton',
      templateUrl: 'chatApp/welcome/welcome.html',
      scope: {
        changeToChat: '<',
        changeToStartView: '<'
      }
    };  
})

.controller ('WelcomeController', ['$scope', function($scope) {
  $scope.title = 'Help us understanding your problems...';
  $scope.placeholder = 'Type a few words about your issue here and click "Start Chat"';
// передаем текст из messageBox 
  $scope.currentText = '';
  $scope.setCurrentText = function(text) {
    $scope.currentText = text;
  };
}]);