Lesson.controller('LessonShowCtrl', ['$scope', 'LessonService', 'Restangular', 'lesson',
  function($scope, LessonService, Restangular, lesson) {

  $scope.states = LessonService.getStates();
  $scope.grades = LessonService.getGrades();

  // determines if mode is preview or editing
  $scope.editing = false;

  // options for the editing window
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

  // options for the preview window
  $scope.previewOptions = {
    autoDownloadFontAwesome: false,
    spellChecker: false,
    toolbar: false,
    status: false
  };
  
  $scope.lesson = lesson;
  $scope.lesson.grade = $scope.lesson.grade.toString(); // for dropdown menu values

  $scope.create = function(newLesson) {
    LessonService.create(newLesson);
  };

  $scope.save = function() {
    LessonService.save($scope.lesson);
    $scope.toggleEditing();
  };

  $scope.toggleEditing = function() {
    $scope.editing = !$scope.editing;
  };

}]);
