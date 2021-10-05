'use strict';

angular.module('myApp.services', [])

.factory('Response', function() {
    var ws = null,
        pendingMessageQueue = [],
        isOpen = function() {
            return Boolean(ws) && ws.readyState === WebSocket.OPEN;
        },
        callbacks = [];
    return {        
        init: function() {
            ws = new WebSocket('ws://localhost:8333');
        
            ws.onopen = function() {
                while(pendingMessageQueue.length) {
                    ws.send(pendingMessageQueue.shift());
                }
            };

            ws.onmessage = function(event) {
                angular.forEach(callbacks, function(callback){
                    callback(event);
                });
            };
        },
        
        sendMessage: function(msg) {
            if (!isOpen()) {
                pendingMessageQueue.push(msg);
            } else {
                ws.send(msg);
            }
        },

        subscribe: function(callback) {
            callbacks.push(callback);
        },
        
        destroy: function() {
            if(ws) ws.close();
        }
    };
});