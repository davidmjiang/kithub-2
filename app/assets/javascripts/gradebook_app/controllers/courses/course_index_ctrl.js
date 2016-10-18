Gradebook.controller("CourseIndexCtrl", ["$scope", "ModalService", "courseList", "NgTableParams", function($scope, ModalService, courseList, NgTableParams) {

  $scope.courses = courseList;

  $scope.showNewCourseModal = function() {
    ModalService.showModal({
      templateUrl: 'gradebook_templates/courses/new.html',
      controller: "NewCourseCtrl"
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(newCourse) {
        if (newCourse) {
          // add the new class to the scope, or get all classes
        }
        // remove leftover modal DOM elements if necessary
      })
    })
  }


      $scope.kids = [{firstName: "Moroni", lastName: "Wilks", email: "foobar1@gmail.com", assignments: [{type: "homework", score: 50}]}];
  $scope.tableParams = new NgTableParams({page: 1, count: 10}, { dataset: $scope.kids});


}])