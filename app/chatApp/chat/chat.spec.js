'use strict';

fdescribe('OnChatMessageController', function() {
  var $controller, $rootScope;
 
  beforeEach(module('myApp.chat'));
  beforeEach(inject(function(_$controller_, _$rootScope_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
  }));

    it('checks if setCurrentText get a string', inject(function($controller) {
      //spec body
      var $scope = $rootScope.$new();
      var controller = $controller('OnChatMessage', { $scope: $scope });
      $scope.chatText = '';
      $scope.setCurrentText('mememe');

      expect($scope.chatText).toEqual('mememe');
    }));

    it('checks if "messages" contain list of messages',  inject(function($controller) {
        var $scope = $rootScope.$new();
        var controller = $controller('OnChatMessage', { $scope: $scope });
        $scope.messages = [];
        $scope.send("first");
        $scope.send("second");
        $scope.send("third");

        expect($scope.messages.length).toEqual(3);
        expect($scope.messages.length).not.toEqual(5);
        expect($scope.messages).toContain("first", "second", "third");
    })
);

// it(`should display server's response`,  inject(function($controller) {
//   var $scope = $rootScope.$new();
//   var controller = $controller('OnChatMessage', { $scope: $scope });
//   $scope.messages = [];
//   $scope.display("Mr.Rabbit");
//   $scope.display("2");
//   $scope.display("third");

//   expect($scope.display.calls.count).toBe(3);
// })
// );
});