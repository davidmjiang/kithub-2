"use strict";

Lesson.controller('SearchCtrl', ['$scope', '$state', '$stateParams', 'Restangular',
  function($scope, $state, $stateParams, Restangular) {

    $scope.test = "From controller"

    console.log($stateParams);

    $scope.lessons = Restangular.all('searches').getList({q: $stateParams})

}]);
