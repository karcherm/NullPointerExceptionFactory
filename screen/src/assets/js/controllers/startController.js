app.controller("startController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope",
    function($q, $scope, $stateParams, store, socketService, $rootScope) {
        
        $scope.start = function() {
            $rootScope.socket.emit('run', {running: true});
        };

        
    }]);