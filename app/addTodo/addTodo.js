'use strict';

angular.module('myApp.addTodo', [])
.directive('addTodo', function() {
  return {
    restrict: 'E',
    scope: {
      setCurrentText: '<',
      send: '<',
    },
    template: '<div class="todoListApp__addTodo" ng-controller="addTodoCtrl"><input  type="text" class="todoListApp__input" ng-model="todoContent" ng-change="setCurrentText(todoContent)" ng-keydown="$event.keyCode === 13 && clear()" autofocus placeholder="Add your new todo"><button class="todoListApp__btn addBtn"  ng-click="send(todoContent); clear()"><i class="fas fa-plus" ></i></button></div>', 
    };  
})
.controller('addTodoCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.clear = function() {
      $scope.todoContent = '';
  };
}]);