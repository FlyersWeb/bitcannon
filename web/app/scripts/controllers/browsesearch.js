'use strict';

/**
 * @ngdoc function
 * @name bitCannonApp.controller:BrowsesearchCtrl
 * @description
 * # BrowsesearchCtrl
 * Controller of the bitCannonApp
 */
angular.module('bitCannonApp')
  .controller('BrowsesearchCtrl', function ($rootScope, $scope, $stateParams, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.category = $stateParams.category;
    var init = function() {
      $http.get($rootScope.api + 'browse/' + $scope.category).
        success(function(data, status) {
          if (status === 200) {
            for (var i = 0; i < data.length; i++) {
              var row = data[i];
              row.Details = '&tr='+row.Details.join('&tr=');
            }
            $scope.results = data;
          }
        else {
          $rootScope.message = data.message;
        }
        }).
        error(function() {
          $rootScope.message = 'API Request failed.';
        });
    };
    init();
  });
