Lesson.controller('LessonNewCtrl', ['$scope', 'LessonService', 'currentUser', 'Restangular',
  function($scope, LessonService, currentUser, Restangular) {

  // $scope.editor = MarkdownService.getEditor();
  $scope.currentUser = currentUser;
  $scope.states = LessonService.getStates();
  $scope.grades = LessonService.getGrades();
  $scope.editing = false;
  $scope.editorOptions = {
    autoDownloadFontAwesome: false,
    spellChecker: false,
    placeholder: "Lesson plan...",
    autosave: {
      enabled: true,
      uniqueId: "lessonEditor", 
    },
    status: ["autosave", "lines", "words"]
  };
  $scope.previewOptions = {
    autoDownloadFontAwesome: false,
    spellChecker: false,
    toolbar: false,
    status: false
  };

  $scope.newLesson = {
    title: "Lesson Title",
    content: "",
    hours: 1,
    state: $scope.states[0],
    grade: $scope.grades[0],
    subject: "",
    lesson_type: ""
  };

  $scope.create = function() {
    LessonService.create($scope.newLesson);
    $scope.toggleEditing();
  };

  $scope.toggleEditing = function() {
    $scope.editing = !$scope.editing;
  };

}]);