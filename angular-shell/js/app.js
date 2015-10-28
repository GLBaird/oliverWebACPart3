
// Create Application Module
var app = angular.module("AngularShell", ["ngRoute"]);

// Define Routes
app.config(["$routeProvider", function($routeProvider) {

    $routeProvider
        .when("/main", {
            templateUrl: "views/main.html",
            controller: "MainController"
        })
        .when("/information", {
            templateUrl: "views/information.html",
            controller: "InformationController"
        })
        .otherwise({
            redirectTo: "/main"
        });

}]);