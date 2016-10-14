Lesson.controller('LessonNewCtrl', ['$scope', 'MarkdownService', 'LessonService', 'currentUser', 'Restangular',
  function($scope, MarkdownService, LessonService, currentUser, Restangular) {

  $scope.editor = MarkdownService.getEditor();
  $scope.currentUser = currentUser;
  $scope.states = LessonService.getStates();
  $scope.grades = LessonService.getGrades();

  $scope.newLesson = {
    title: "",
    content: "",
    hours: 1,
    state: $scope.states[0],
    grade: $scope.grades[0],
    subject: "",
    lesson_type: ""
  }

  $scope.editor.codemirror.on("change", function(){
    $scope.newLesson.content = $scope.editor.value();
  });

  $scope.create = function() {
    Restangular.all('lesson_plans').post({
      lesson_plans: newLesson
    }).then(function(response) {
      // returns lesson object
      console.log(response)

    },
    function(response) {
      // returns error object
      console.error(response.errors)
    });
  };

}]);