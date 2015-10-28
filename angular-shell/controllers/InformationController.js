var app = angular.module("AngularShell");

// create Information Controller
app.controller("InformationController", ["$rootScope", function($rootScope){
    console.log("Information Controller running..");

    $rootScope.names = $rootScope.names || [ "Betty", "Sue", "Mary", "Fanny" ];

}]);