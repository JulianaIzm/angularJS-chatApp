'use strict';

angular.module('myApp.messageBox', [])
    .directive('messageBox', function() {
        return {
            scope: {
                placeholder: '<',
                setCurrentText: '<'
            },
            template: 
            `<textarea ng-controller='messageBoxCtrl' ng-model="messageContent" ng-change="setCurrentText(messageContent)" autofocus ng-keydown="$event.keyCode === 13 && doClear($event)" class="message-box" placeholder={{::placeholder}}></textarea>`
        };
    })

    .controller ('messageBoxCtrl', ['$scope', function($scope) { 
        $scope.doClear = function($event) {
            $event.preventDefault();
            $scope.messageContent = ''; 
    };
    }]);
