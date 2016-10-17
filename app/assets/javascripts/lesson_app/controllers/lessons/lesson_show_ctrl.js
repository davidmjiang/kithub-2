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
  $scope.newLesson = {
    id: lesson.id || undefined,
    title: lesson.title || "Lesson Title",
    content: lesson.content || "",
    hours: lesson.hours || 1,
    state: lesson.state || $scope.states[0],
    grade: lesson.grade || $scope.grades[0],
    subject: lesson.subject || "",
    lesson_type: lesson.lesson_type || ""
  };

  $scope.create = function() {
    LessonService.create($scope.newLesson);
  };

  $scope.save = function() {
    LessonService.save($scope.newLesson);
    $scope.toggleEditing();
  };

  $scope.toggleEditing = function() {
    $scope.editing = !$scope.editing;
  };

}]);
