Gradebook.controller("CourseIndexCtrl", ["$scope", "ModalService", "courseList", "CourseService", "NgTableParams", "VisualService", function($scope, ModalService, courseList, CourseService, NgTableParams, VisualService) {

  $scope.courses = courseList;

  $scope.showNewCourseModal = function() {
    ModalService.showModal({
      templateUrl: 'gradebook_templates/courses/new.html',
      controller: "NewCourseCtrl"
    }).then(function(modal) {
      modal.element.modal();
    })
  }

  $scope.showInfoModal = function(course) {
    ModalService.showModal({
      templateUrl: "gradebook_templates/courses/info.html",
      controller: "CourseInfoModalCtrl",
      inputs: {
        course: course
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.element.one('hidden.bs.modal', function () {
        if (!modal.controller.closed) {
            modal.controller.closeModal();
        }
      })
    })
  }

}])