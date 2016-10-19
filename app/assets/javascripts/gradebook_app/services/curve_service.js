Gradebook.factory("CurveService", ["Restangular", function(Restangular) {

  var stub = {}

  stub.applyFlatCurve = function(flatRate, assignmentId) {
    return Restangular.all('flat_curves').post({
      flat_curve: {
        assignment_id: assignmentId,
        flat_rate: flatRate
      }
    }).then(function(response) {
      console.log("response in service")
      console.log(response)
      return response
    })
  }

  return stub

}])