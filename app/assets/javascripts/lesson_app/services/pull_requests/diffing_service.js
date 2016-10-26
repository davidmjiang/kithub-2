angular.module('Lesson').factory('DiffService', ['JsDiff', function(JsDiff) {

  var DiffS = {};

  DiffS.getDiffs = function(parent, forked) {
    var diffs = JsDiff.diffTrimmedLines(parent, forked);

    diffs.forEach(function(element) {
      element.accepted = true;
    });

    return diffs;
  };

  DiffS.acceptChanges = function(diffs) {
    var result = "";

    diffs.forEach(function(element, index) {
      // console.log(element)
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

    console.log(result);
    return result;
  };


  return DiffS;

}]);
