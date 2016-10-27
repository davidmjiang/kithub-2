Gradebook.controller("CourseIndexCtrl", ["$scope", "$sce", "ModalService", "courseList", "CourseService", "NgTableParams", "VisualService", function($scope, $sce, ModalService, courseList, CourseService, NgTableParams, VisualService) {

  $scope.courses = courseList;

  $scope.showNewCourseModal = function() {
    ModalService.showModal({
      templateUrl: 'gradebook_templates/courses/new.html',
      controller: "NewCourseCtrl"
    }).then(function(modal) {
      modal.element.modal();
    })
  }

  var courseStudents = function() {
    var students = [];
    for(var i = 0; i < $scope.courses.length; i++) {
      students.push($scope.courses[i])
    }
    $scope.students = students;
  }

  courseStudents();
  console.log($scope.students);

  $scope.popoverTemplateUrl =  'gradebook_templates/courses/info_popover.html'

}])