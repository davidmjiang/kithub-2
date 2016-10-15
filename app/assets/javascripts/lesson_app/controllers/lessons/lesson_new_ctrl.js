Lesson.controller('LessonNewCtrl', ['$scope', 'LessonService', 'currentUser', 'Restangular',
  function($scope, LessonService, currentUser, Restangular) {

  // $scope.editor = MarkdownService.getEditor();
  $scope.currentUser = currentUser;
  $scope.states = LessonService.getStates();
  $scope.grades = LessonService.getGrades();
  $scope.editorOptions = {
    spellChecker: false,
    placeholder: "Lesson plan...",
    status: false
  };

  $scope.newLesson = {
    title: "Title",
    content: "",
    hours: 1,
    state: $scope.states[0],
    grade: $scope.grades[0],
    subject: "",
    lesson_type: ""
  };

  // $scope.editor.codemirror.on('change', function() {
  //     console.log($scope)
  //     $scope.newLesson.hours++
  // });

  $scope.create = function() {
    LessonService.create($scope.newLesson);
  };

}]);