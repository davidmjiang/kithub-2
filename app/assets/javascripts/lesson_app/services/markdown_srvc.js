Lesson.factory('MarkdownService', ['$document', function($document) {

  var markdownService = {};
  var _editor = new SimpleMDE({
    element: $document.find('#editor');
  });

  markdownService.getEditor = function() {
    return _editor;
  }

  return markdownService;

}]);