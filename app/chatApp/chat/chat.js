'use strict';

angular.module('myApp.chat', ['myApp.services']).
  directive('chat', function() {
    return {
      restict: 'EA',
      templateUrl: 'chatApp/chat/chat.html',
      scope: {
        changeToStartView: '<',
        setCurrentText: '<',
        chatInitialMessage: '<',
        
      }
  };
})

  .controller ('OnChatMessage', ['$scope', '$window', 'Response', function($scope, $window, Response) {
    $scope.title = 'Bill Gates';
    $scope.description = 'Sales Support Department';
    $scope.placeholder = 'Type a message and press Enter...';

    Response.subscribe(function (message) {  
      $scope.$apply(function () {
          var data = message.data;
          $scope.messages.push(data);
      });
});

    $scope.chatText = '';
    $scope.setCurrentText = function(text) {
      $scope.chatText = text;
    };
    
    // работа с сообщениями    
    $scope.messages = [$scope.chatInitialMessage];
    Response.init();
    Response.sendMessage($scope.chatInitialMessage);
    
    $scope.send = function(text) {
      $scope.messages.push(text);
      Response.sendMessage(text);
    };
  }]);