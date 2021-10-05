'use strict';

describe('messageBoxCtrl', function() {
  var $controller, $rootScope;
 
  beforeEach(module('myApp.messageBox'));
  beforeEach(inject(function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
  }));

    it('', inject(function($controller) {
      //spec body
        var e = jasmine.createSpyObj('e', [ 'preventDefault' ]);    
        var $scope = $rootScope.$new();
        var controller = $controller('messageBoxCtrl', { $scope: $scope });
        $scope.messageContent = '123';
        $scope.doClear(e);
        
        expect(e.preventDefault).toHaveBeenCalled();
        expect($scope.messageContent).toEqual('');
    }));
});