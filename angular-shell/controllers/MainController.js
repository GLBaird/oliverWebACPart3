var app = angular.module("AngularShell");

// create Main Controller
app.controller("MainController", ["$scope", "$rootScope", function($scope, $rootScope) {
    console.log("Main Controller running..");

    $rootScope.names = $rootScope.names || [];

    $scope.username = "Leon Baird";

    $scope.info = {
        product: "Bag of Air",
        serialNumber: "12345XX"
    };

    $scope.addName = function() {

        $rootScope.names.push($scope.username);

    }

}]);