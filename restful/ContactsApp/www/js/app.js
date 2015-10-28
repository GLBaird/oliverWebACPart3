// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var restURL = "http://localhost:3000/contacts";

angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller("ContactList", [
    "$scope", "$http", "$ionicModal", "$rootScope",
    function ($scope, $http, $ionicModal) {

      function handleError(res) {
        // error handler
        navigator.notification.alert(
          res.status + " " + res.statusText + " " + res.data,
          function () {
          },
          "Network Error",
          "OK"
        );
      }

      function update() {
        $http.get(restURL)
          .then(function (res) {

            $scope.contacts = res.data;

          }, handleError);
      }

      $ionicModal.fromTemplateUrl('views/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $scope.openModal = function () {
        $scope.modal.show();
      };

      $scope.closeModal = function () {
        $scope.modal.hide();
      };

      $scope.save = function() {
        console.log($scope);
        $http.post(restURL, $scope.new)
          .then(function(res) {
            update();
            $scope.modal.hide();
           $scope.new = {};
          }, handleError);
      };

      $scope.new = {};

      update();

    }
  ]);
