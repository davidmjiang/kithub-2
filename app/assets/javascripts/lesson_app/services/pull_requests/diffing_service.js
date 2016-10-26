angular.module('Lesson').factory('DiffService', ['JsDiff', function(JsDiff) {

  var DiffS = {};

  // given two strings, returns a diffs object
  // that shows the changes made, and each object
  // has an 'accepted' trait
  DiffS.getDiffs = function(old, current) {
    var diffs = JsDiff.diffTrimmedLines(old, current);

    diffs.forEach(function(element) {
      element.accepted = true;
    });

    return diffs;
  };

  // given a diffs object, creates a new string
  // based on whether changes were accepted or rejected
  // Returns new string
  DiffS.acceptChanges = function(diffs) {
    var result = "";

    diffs.forEach(function(element, index) {
      if (element.added) {
        if (element.accepted)
          result += element.value;
      } else if (element.removed) {
        if (!element.accepted)
          result += element.value;
      } else {
        result += element.value;
      }
    });

    return result;
  };


  return DiffS;

}]);
