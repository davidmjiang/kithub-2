Gradebook.controller("StudentModalCtrl", ["$scope", "students", "email", "assignments", "overall", "_", "StudentService", function($scope, students, email, assignments, overall, _, StudentService) {

  $scope.student = _.find(students, {'email':email})
  $scope.assignments = assignments;
  $scope.overall = overall;
  $scope.labels = _.map(assignments, 'title');
  $scope.opts = {
  scales: {
    yAxes: [
      {ticks: {
        beginAtZero: true,
        steps: 10,
        stepValue: 10,
        max: 100
      }}]
    }
  }

  $scope.data = [_.map($scope.student.submissions, function(submission) {
    var assignment = _.find(assignments, {'id':submission.assignment_id})
    var possible = assignment.possible_score
    return (((submission.raw_score / possible)*100).toFixed(2));
  })];

  $scope.update = function(notes) {
    StudentService.updateStudent({student: {notes: notes}}, $scope.student)
  }

}])