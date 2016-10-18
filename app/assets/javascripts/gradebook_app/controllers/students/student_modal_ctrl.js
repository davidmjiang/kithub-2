Gradebook.controller("StudentModalCtrl", ["$scope", "students", "email", "assignments", "_", function($scope, students, email, assignments, _) {

  $scope.student = _.find(students, {'email':email})

  $scope.assignments = assignments;

  $scope.labels = _.map(assignments, 'title');

  $scope.data = [_.map($scope.student.submissions, function(submission) {
    var assignment = _.find(assignments, {'id':submission.assignment_id})
    var possible = assignment.possible_score
    return ((submission.raw_score / possible)*100);
  })];

}])