Lesson.controller('LessonShowCtrl', ['$scope', 'LessonService', 'Restangular', 'lesson', 'currentUser',
  function($scope, LessonService, Restangular, lesson, currentUser) {

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
    status: ["lines", "words"]
  };

  $scope.lesson = lesson;
  $scope.lesson.grade = $scope.lesson.grade.toString(); // for dropdown menu values

  // checks whether or not the lesson
  // belongs to the current user, and sets
  // currentUserLesson accordingly
  var checkCurrentUser = function() {
    if (currentUser.id === $scope.lesson.teacher_id) {
      $scope.currentUserLesson = true;
    } else {
      $scope.currentUserLesson = false;
    }
  };
  checkCurrentUser();

  $scope.create = function(newLesson) {
    LessonService.create(newLesson);
  };

  // patches the lesson object
  $scope.save = function() {
    LessonService.save($scope.lesson);
    $scope.toggleEditing();
  };

  // switch from editing to preview mode
  $scope.toggleEditing = function() {
    $scope.editing = !$scope.editing;
  };

}]);
