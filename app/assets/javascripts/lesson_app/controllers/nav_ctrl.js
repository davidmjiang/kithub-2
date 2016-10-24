"use strict";

Lesson.controller('NavCtrl', ['$scope', '$state',
  function($scope, $state) {


  $scope.searchType = "title"
  $scope.search = function(){
    $state.go('main.search', {searchTerm: $scope.term, searchType: $scope.searchType});
    $scope.term = "";
  }; 

  $('#search-type-select').on('changed.bs.select', function (e) {
    console.log(e.target.value)
  });






}]);
