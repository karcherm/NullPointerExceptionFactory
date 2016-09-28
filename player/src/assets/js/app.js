// Environment variables

apiBase = "http://private-d5ebba-fundingsystem.apiary-mock.com";

var app = angular.module("nullPointerExceptionFactoryPlayer", [
    "ui.router",
    "ui.utils",
    "angular-storage",
    'ui.bootstrap',
    'btford.socket-io'
]).run(function($rootScope, $state, $stateParams, store, socketService) {
    $rootScope.inGame = false;
    $rootScope.socket = socketService;
    $rootScope.socket.on("gameStatus", function(viewName) {
        if(viewName == "writeAnswer") $state.go("game.write");
        else if(viewName == "guessAnswer") $state.go("game.guess")
    });
    $rootScope.socket.on("answers", function(answers) {
        $rootScope.answers = answers;
    });
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', function(e, to, params) {
        if (to.data && to.data.requiresName) {
            if (!store.get('name') || store.get('name') == undefined) {
                e.preventDefault();
                // TODO: save where user wanted to go
                $rootScope.navState = to;
                $rootScope.navStateParams = params;
                console.log($rootScope.navState);
                console.log($rootScope.navStateParams);
                $state.go('nameSelect');
            }
        }
    });

}).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("/nameSelect");
    $stateProvider
        .state("game", {
            url: "/game",
            abstract: true,
            templateUrl: "templates/game.html",
            controller: "gameController",
            data: {
                requiresName: true
            }
        })
        .state("nameSelect", {
            url: "/nameSelect",
            templateUrl: "templates/nameSelect.html",
            controller: "nameSelectController"
        })
        .state("game.wait", {
            url: "/wait",
            templateUrl: "templates/game/wait.html"
        })
        .state("game.write", {
            url: "/write",
            templateUrl: "templates/game/writeAnswer.html"
        })
        .state("game.guess", {
            url: "/guess",
            templateUrl: "templates/game/guessAnswer.html"
        })
});