'use strict';

describe('WelcomeController', function() {
  var $controller, $rootScope;
 
  beforeEach(module('myApp.welcome'));
  beforeEach(inject(function(_$controller_, _$rootScope_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
  }));

    it('checks if setCurrentText get a string', inject(function($controller) {
      //spec body
      var $scope = $rootScope.$new();
      var controller = $controller('WelcomeController', { $scope: $scope });
      $scope.currentText = '';
      $scope.setCurrentText('bebebe');

      expect($scope.currentText).toBe('bebebe');
    }));
  });