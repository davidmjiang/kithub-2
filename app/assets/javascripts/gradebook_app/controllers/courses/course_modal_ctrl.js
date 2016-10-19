Gradebook.controller("CourseModalCtrl", ["$scope", "_", "course", "assignments", "gpa", "students", "close", "VisualService", function($scope, _, course, assignments, gpa, students, close, VisualService) {

  $scope.course = course;
  $scope.gpa = gpa;
  $scope.close = function() {
    angular.element('body').removeClass('modal-open');
    angular.element(".modal-backdrop").remove();
    close();
  };

  var averages = VisualService.studentAverages(students, assignments)
  $scope.studentLabels = _.map(averages, 'name');
  $scope.studentData = [_.map(averages, function(student){
    return student.average.toFixed(2);
  })];

  $scope.assignmentLabels = _.map(assignments, 'title');
  $scope.assignmentData = [_.map(assignments, function(assignment) {
    return VisualService.assignmentAvg(assignment).toFixed(2);
  })];

  $scope.opts = {
    scales: {
      yAxes: [
        {ticks: {
          beginAtZero: true,
          steps: 10,
          stepValue: 10,
          max: 100
        }}
      ]
    }
  }

}])