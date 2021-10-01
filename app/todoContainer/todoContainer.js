'use strict';

angular.module('myApp.todoContainer', ['myApp.dragdrop'])
.directive('todo', function() {
  return {
    restrict: 'E',
    scope: {
      clear: '=',
    },
    templateUrl: 'todoContainer/todoContainer.html',
  };
})
.controller('todoCtrl', ['$scope', '$window', function($scope, $window) {
//этот код работает с resize, но не работает с load and DOMContentLoaded!!!
//   angular.element($window).on('resize', function () {
//     $scope.getTodos();
// });

  $scope.date = new Date();
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  $scope.day = weekday[$scope.date.getDay()];

  var allMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  $scope.month = allMonths[$scope.date.getMonth()];
  $scope.month.toUpperCase();

  $scope.inputText = '';
  $scope.setCurrentText = function(text) {
    $scope.inputText = text;
  };

  $scope.messages = [];
  $scope.readyTasks = [];
  
  $scope.send = function(text) {
    $scope.messages.push(text);
    $scope.saveToLS(text);
  };

  $scope.todos;
  $scope.checkLS = function() {
    if($window.localStorage.getItem('todos') === null) {
      $scope.todos = [];
    } else {
      $scope.todos = JSON.parse($window.localStorage.getItem('todos'));
    }
  };

  $scope.saveToLS = function(todo) {
    $scope.checkLS();
    $scope.todos.push(todo);
    $window.localStorage.setItem('todos', JSON.stringify($scope.todos));
  };

  $scope.getTodos = function() {
    $scope.checkLS();
    $scope.todos.forEach(function(todo) {
      $scope.messages.push(todo);
    });
  };

  $scope.removeFromLS = function(todo) {
    $scope.checkLS();
    var index = $scope.messages.indexOf(todo);
    $scope.todos.splice(index, 1);
    $window.localStorage.setItem('todos', JSON.stringify($scope.messages));
  };

  $scope.clean = function() {
    $scope.messages = [];
    $scope.readyTasks = [];
    $window.localStorage.clear();
  };

  $scope.dropSuccessHandler = function(index,array){
    array.splice(index,1);
    $scope.removeFromLS();
};
  $scope.onDrop = function($data, array){
    array.unshift($data);
    console.log($data);
  };
}])

.directive('autoScroll', function () {
  return {
      restrict: 'A',
      link: function (scope, element, attrs, ctrls) {
          var scrollToBottom = function () {
              element[0].scrollTop = element[0].scrollHeight;
          };
          scope.$watchCollection('messages', scrollToBottom);
      }
  };
});