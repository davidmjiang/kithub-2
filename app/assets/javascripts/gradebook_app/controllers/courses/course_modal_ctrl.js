Gradebook.controller("CourseModalCtrl", ["$scope", "_", "course", "assignments", "gpa", "students", "close", function($scope, _, course, assignments, gpa, students, close) {

  $scope.course = course;
  $scope.assignments = assignments;
  $scope.gpa = gpa;
  $scope.students = students;
  $scope.close = function() {
    angular.element('body').removeClass('modal-open');
    angular.element(".modal-backdrop").remove();
    close();
  };

  var getPercent = function(assignment, score) {
    var possible = assignment.possible_score;
    return ((score/possible)*100);
  };

  var assignmentAvg = function(assignment) {
    var sum = 0;
    for (var i = 0; i < assignment.submissions.length; i++) {
      sum += getPercent(assignment, assignment.submissions[i].raw_score)
    }
    return sum / assignment.submissions.length
  };

  var studentAvg = function(student) {
    var sum = 0;
    for (var i = 0; i < student.submissions.length; i++) {
      var submission = student.submissions[i];
      var assignment = _.find($scope.assignments, {'id': submission.assignment_id});
      sum += getPercent(assignment, submission.raw_score)
    }
    return sum / student.submissions.length
  };

  var studentAverages = function(students) {
    var studentArray = [];
    angular.forEach(students, function(student) {
      studentArray.push({
              'name': student.first_name + " " + student.last_name[0] + ".",
              'average': studentAvg(student)})
    })
    studentArray.sort(function(a, b){
      return a.average-b.average
    })
    return studentArray
  };

  var averages = studentAverages($scope.students)
  $scope.studentLabels = _.map(averages, 'name');
  $scope.studentData = [_.map(averages, function(student){
    return student.average.toFixed(2);
  })];

  $scope.assignmentLabels = _.map(assignments, 'title');
  $scope.assignmentData = [_.map(assignments, function(assignment) {
    return assignmentAvg(assignment).toFixed(2);
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