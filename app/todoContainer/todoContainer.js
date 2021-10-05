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

  $scope.tasks = [];
  $scope.readyTasks = [];
  
  $scope.send = function(text) {
    $scope.tasks.push(text);
    $scope.saveTasksToLS(text);
  };

  $scope.todos;
  $scope.checkLS = function() {
    if($window.localStorage.getItem('todos') === null) {
      $scope.todos = [];
    } else {
      $scope.todos = JSON.parse($window.localStorage.getItem('todos'));
    }
  };

  $scope.saveTasksToLS = function(todo) {
    $scope.checkLS();
    $scope.todos.push(todo);
    $window.localStorage.setItem('todos', JSON.stringify($scope.todos));
  };

  // this.todos.forEach(function(obj) {
  //   document.getElementById(obj.container).appendChild(document.getElementById(obj.element));
  // });

  $scope.getTodos = function($document) {
    $scope.checkLS();
    var nodesArray = Array.prototype.slice.call($scope.tasks);

  var nodesArray = nodesArray.filter( function(e) { 
    return this.todos.map(function(d) { 
      return d['element']; }).indexOf(e) === -1; 
  }).forEach( function(e) { 
    this.todos.push({'element':e.id, 'container': 'tasks'}); 
  });
  this.todos.forEach(function( obj ) {
    $document.getElementById(obj.container).appendChild($document.getElementById(obj.element));
    // $scope.todos.forEach(function(todo) {
    //   $scope.tasks.push(todo);
    });
  };

  $scope.removeFromLS = function(todo) {
    $scope.checkLS();
    var index = $scope.tasks.indexOf(todo);
    $scope.todos.splice(index, 1);
    $window.localStorage.setItem('todos', JSON.stringify($scope.tasks));
  };

 

  $scope.clean = function(e) {
    $scope.tasks = [];
    $scope.readyTasks = [];
    $window.localStorage.clear();
  };

  $scope.dropSuccessHandler = function(index,array){
    array.splice(index,1);
};
  $scope.onDrop = function($data, array, el){
    array.unshift($data);
    var indexEl = this.todos.map(function(d) { return d['element']; }).indexOf(el.id);
    if (indexEl>-1)
      this.todos.splice(indexEl, 1);
      $window.localStorage.setItem('todos', JSON.stringify(this.todos));
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