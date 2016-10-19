Gradebook.controller("CourseModalCtrl", ["$scope", "_", "course", "assignments", "gpa", function($scope, _, course, assignments, gpa) {

  $scope.course = course;
  $scope.assignments = assignments;
  $scope.gpa = gpa;

  $scope.labels = _.map(assignments, 'title');

  var getAvg = function(assignment) {
    var possible = assignment.possible_score;
    var sum = 0;
    for (var i = 0; i < assignment.submissions.length; i++) {
      sum += assignment.submissions[i].raw_score
    }
    var avg = sum / assignment.submissions.length
    return ((avg/possible) * 100)
  };

  $scope.data = [_.map(assignments, function(assignment) {
    return getAvg(assignment).toFixed(2);
  })];

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

}])