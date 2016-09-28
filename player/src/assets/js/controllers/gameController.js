app.controller("gameController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope",
    function($q, $scope, $stateParams, store, socketService, $rootScope) {
        
        $scope.writeAnswer = function(answer) {
            $rootScope.socket.emit('addAnswer', {answer: answer, player: store.get("name")});
        };

        $scope.guessAnswer = function(index) {
            $rootScope.socket.emit('guessAnswer', {answer: index, player: store.get("name")});
        };
        
    }]);