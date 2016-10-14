Lesson.controller('LessonNewCtrl', ['MarkdownService', function(MarkdownService) {

  $scope.editor = MarkdownService.getEditor();

}]);