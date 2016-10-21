"use strict";

Lesson.controller('NavCtrl', ['$scope', '$state',
  function($scope, $state) {

  $scope.search = function(params){
    $state.go('main.search', {title_cont: $scope.term, content_cont: $scope.term})
  }; 

  




}]);
