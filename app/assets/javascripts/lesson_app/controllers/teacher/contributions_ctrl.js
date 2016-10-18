"use strict";
angular.module('Lesson').controller('ContributionsCtrl', ['$scope', 'currentUser', 'lessons_contributed_to', function($scope, currentUser, lessons_contributed_to){

  $scope.lessons_contributed_to = lessons_contributed_to

}]);