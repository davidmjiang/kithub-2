Gradebook.controller("StudentModalCtrl", ["$scope", "students", "email", "assignments", "overall", "_", "StudentService", "VisualService", "CurveService", function($scope, students, email, assignments, overall, _, StudentService, VisualService, CurveService) {

  $scope.student = _.find(students, {'email':email})
  $scope.assignments = assignments;
  $scope.overall = VisualService.studentAvg($scope.student, assignments);

  var _applyCurve = function(assignment, rawPercent) {
    if (assignment.flat_curve) {
      return rawPercent + assignment.flat_curve.flat_rate
    } else if (assignment.linear_curve) {
      return CurveService.linearFormula(assignment.linear_curve, rawPercent)
    } else {
      return rawPercent
    }
  }

  var filteredSubs = _.filter($scope.student.submissions, function(submission){
    return submission.raw_score !== -1
  })

  var scores = _.map(filteredSubs, function(submission) {
    var assignment = _.find(assignments, {'id':submission.assignment_id});
    var rawPercent = VisualService.getPercent(assignment, submission.raw_score);
    var percent = _applyCurve(assignment, rawPercent);
    return {
      'title': assignment.title,
      'percent': percent
    }
  });

  $scope.labels = _.map(scores, 'title');
  $scope.data = [_.map(scores, function(score) {
    return score.percent.toFixed(2);
  })];

  $scope.update = function(notes) {
    StudentService.updateStudent({student: {notes: notes}}, $scope.student)
  }

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

}])