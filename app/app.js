'use strict';

angular.module('myApp', [
  'myApp.welcome',
  'myApp.chat',
  'myApp.messageBox',
  'myApp.toolbar',
  'myApp.services',
  'myApp.version'
])

.directive('questionButton', function() {
  return {
    restrict: 'E',
    template: `<button ng-show="isQuestionButton" id="chat-icon" ng-click='toggleStartView()'>?</button>`
  };  
})

.controller('View', ['$scope', function($scope) {
  $scope.isWelcome = true;
  
  // переключение между кнопкой вопроса и чатом
  $scope.isQuestionButton = true;
  $scope.toggleStartView = function() {
  $scope.isQuestionButton = $scope.isQuestionButton === false ? true: false;
  $scope.isWelcome = true;
};

    // этот код заставляет работать кнопку в welcome
  $scope.textFromWelcomeToChat = '';
  $scope.showChat = function(text) {
      $scope.isWelcome = !$scope.isWelcome;
      $scope.textFromWelcomeToChat = text;
  };
}]);