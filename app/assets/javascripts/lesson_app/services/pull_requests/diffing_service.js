angular.module('Lesson').factory('DiffService', ['JsDiff', function(JsDiff) {

  return JsDiff.diffWords

}]);
