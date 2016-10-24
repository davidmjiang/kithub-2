Gradebook.factory("CurveService", ["Restangular", function(Restangular) {

  var stub = {}



  var _restangularizeFlatCurve = function(assignment) {
    return Restangular.restangularizeElement(null, assignment.flat_curve, 'flat_curves')
  }

  stub.linearFormula = function(input, rawPercent) {
    return input.curvedA + (((input.curvedB - input.curvedA)/(input.rawB - input.rawA)) * (rawPercent - input.rawA));
  }

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

  stub.editFlatCurve = function(assignment, flatRate) {
    Restangular.restangularizeElement(null, assignment.flat_curve, 'flat_curves')
    return assignment.flat_curve.patch({
      flat_curve: {
        // assignment_id: assignment.id,
        flat_rate: flatRate
      }
    })
  }

  stub.editLinearCurve = function(assignment, inputs) {
    Restangular.restangularizeElement(null, assignment.linear_curve, 'linear_curves')
    return assignment.linear_curve.patch({
      linear_curve: {
        rawA: inputs.rawA,
        rawB: inputs.rawB,
        curvedA: inputs.curvedA,
        curvedB: inputs.curvedB,
      }
    })
  }

  stub.removeCurve = function(assignment) {
    if (assignment.flat_curve) {
      Restangular.restangularizeElement(null, assignment.flat_curve, 'flat_curves')
      return assignment.flat_curve.remove()
    } else if (assignment.linear_curve) {
      Restangular.restangularizeElement(null, assignment.linear_curve, 'linear_curves')
      return assignment.linear_curve.remove()
    }
  }

  return stub

}])