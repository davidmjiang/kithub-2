Gradebook.factory("CurveService", ["Restangular", function(Restangular) {

  var stub = {}

  stub.applyFlatCurve = function(flatRate, assignmentId) {
    return Restangular.all('flat_curves').post({
      flat_curve: {
        assignment_id: assignmentId,
        flat_rate: flatRate
      }
    })
  }

  stub.applyLinearCurve = function(inputs, assignmentId) {
    return Restangular.all('linear_curves').post({
      linear_curve: {
        assignment_id: assignmentId,
        rawA: inputs.rawA,
        rawB: inputs.rawB,
        curvedA: inputs.curvedA,
        curvedB: inputs.curvedB
      }
    })
  }

  return stub

}])