Gradebook.controller("CourseModalCtrl", ["$scope", "_", "course", "assignments", "gpa", "students", "close", "VisualService", "GPAService", "CourseService", "$state", function($scope, _, course, assignments, gpa, students, close, VisualService, GPAService, CourseService, $state) {

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
    return student.percent.toFixed(2);
  })];

  $scope.assignmentLabels = _.map(assignments, 'title');
  $scope.assignmentData = [_.map(assignments, function(assignment) {
    return GPAService.getAverages($scope.course, assignment).toFixed(2);
  })];

  var pieScores = _.map(averages, function(student){
    return student.percent;
  });

  var courseDistribution = VisualService.gradeDistribution(pieScores)
  $scope.courseLabels = _.map(courseDistribution, function(amount, grade){return grade});
  $scope.courseData = _.map(courseDistribution, function(amount, grade){return amount});
  $scope.colors = ['#4caf50', '#81c784', '#c8e6c9', '#ef9a9a', '#f44336']

  this.closed = false;

  this.closeModal = function () {
    close(null, 200);
    this.closed = true;
  }

  $scope.barOpts = {
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

  $scope.pieOpts = {
    legend: { display: true },
    showTooltips: true,
  };

  $scope.deleteCourse = function() {
    if (confirm('Are you sure?')) {
      CourseService.deleteCourse($scope.course).then(function(response) {
        $state.go("gradebook.courseIndex");
        angular.element('body').removeClass('modal-open');
        angular.element(".modal-backdrop").remove();
      })
    }
  };

}])