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

  $scope.popoverTemplateUrl =  'gradebook_templates/courses/info_popover.html'

}])