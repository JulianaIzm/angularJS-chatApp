'use strict';

describe('Responce', function() {
  var ws = new WebSocket('ws://localhost:8333'),
  pendingMessageQueue = [],
  isOpen = function() {
      return Boolean(ws) && ws.readyState === WebSocket.OPEN;
  },
  callbacks = [];
  beforeEach(angular.mock.module('myApp.services'));
  beforeEach(function() {
    ws = jasmine.createSpyObj('ws', ['onopen', 'onmessage']);

    ws.onopen();
    ws.onmessage('ret');
  });
  
  it('should init ws connection', function() {
    angular.mock.inject(function(Response) {
      pendingMessageQueue = ['one', 'two'];
      
      expect(ws.onopen).toHaveBeenCalled();
      expect(ws.onmessage).toHaveBeenCalledWith('ret');
    });
  });

  it('should send message to server', function() {
    angular.mock.inject(function(Response) {
      var sendMessageSpy = jasmine.createSpy('sendMessage');
      sendMessageSpy('Lalala');
  
      expect(sendMessageSpy).toHaveBeenCalledWith('Lalala');
    });
  });

  it('should subscribe to event in chat-template', function() {
    angular.mock.inject(function(Response) {
      var subscribeSpy = jasmine.createSpy('subscribe');
      subscribeSpy('1');
      subscribeSpy('display');
      subscribeSpy('gg');
  
      expect(subscribeSpy).toHaveBeenCalled();
      expect(callbacks).withContext('1', 'display', 'gg');
    });
  });
  
  it('should destroy ws-connection', function() {
    angular.mock.inject(function(Response) {
      var destroySpy = jasmine.createSpy('destroy');
      destroySpy();
  
      expect(destroySpy).toHaveBeenCalled();
    });
  });
});