"use strict";
angular.module('Lesson').controller('ContributionsCtrl', ['$scope', 'currentUser', 'lessons_contributed_to', '$rootScope', function($scope, currentUser, lessons_contributed_to, $rootScope){

	$rootScope.$broadcast("on:page", "contributions");

  $scope.lessons_contributed_to = lessons_contributed_to

}]);