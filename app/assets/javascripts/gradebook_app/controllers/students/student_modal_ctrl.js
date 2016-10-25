Gradebook.controller("StudentModalCtrl", ["$scope", "students", "email", "assignments", "overall", "_", "StudentService", "VisualService", "CurveService", function($scope, students, email, assignments, overall, _, StudentService, VisualService, CurveService) {

  $scope.student = _.find(students, {'email':email})
  $scope.assignments = assignments;
  $scope.overall = VisualService.studentAvg($scope.student, assignments);
  $scope.labels = _.map(assignments, 'title');
  $scope.opts = {
  scales: {
    yAxes: [
      {ticks: {
        beginAtZero: true,
        steps: 10,
        stepValue: 10
      }}]
    }
  }

  var _applyCurve = function(assignment, rawPercent) {
    if (assignment.flat_curve) {
      return rawPercent + assignment.flat_curve.flat_rate
    } else if (assignment.linear_curve) {
      return CurveService.linearFormula(assignment.linear_curve, rawPercent)
    } else {
      return rawPercent
    }
  }

  $scope.data = [_.map($scope.student.submissions, function(submission) {
    var assignment = _.find(assignments, {'id':submission.assignment_id})
    var possible = assignment.possible_score
    var rawScore = (submission.raw_score / possible)*100
    return (_applyCurve(assignment, rawScore).toFixed(2));
  })];

  $scope.update = function(notes) {
    StudentService.updateStudent({student: {notes: notes}}, $scope.student)
  }

}])