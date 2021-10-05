'use strict';

describe('myApp', function() {
    var $controller, $rootScope;
    
    beforeEach(module('myApp'));
    beforeEach(inject(function(_$controller_, _$rootScope_){
            $controller = _$controller_;
            $rootScope = _$rootScope_;
    }));

    it('checks if questionButton toggle views', inject(function($controller) {
      //spec body
        var $scope = $rootScope.$new();
        var controller = $controller('View', { $scope: $scope });
        $scope.isQuestionButton = true;
        $scope.toggleStartView();

        expect($scope.isQuestionButton).toBeFalsy();
    }));

    it('checks if questionButton toggle views', inject(function($controller) {
        //spec body
        var $scope = $rootScope.$new();
        var controller = $controller('View', { $scope: $scope });
        $scope.isWelcome = true;
        $scope.textFromWelcomeToChat = '';
        $scope.showChat('London is a capital');

        expect($scope.isWelcome).toBeFalsy();
        expect($scope.textFromWelcomeToChat).toEqual('London is a capital');
        }));
});