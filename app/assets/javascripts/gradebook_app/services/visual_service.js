Gradebook.factory("VisualService", ["Restangular", function(Restangular) {

  var VisualService = {}

  var _assignments = []

  VisualService.courseGPAs = function() {
    return Restangular.all('submissions').getList().then(function(response) {
      return angular.copy(response, _assignments)
    })
  }

  return VisualService

}])