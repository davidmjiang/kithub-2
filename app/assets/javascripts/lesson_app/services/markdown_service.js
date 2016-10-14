Lesson.factory('MarkdownService', ['$document', function($document) {

  var markdownService = {};
  var _editor = new SimpleMDE({
    element: $document.find('#editor')[0],
    spellChecker: false,
    placeholder: "Lesson plan...",
    status: false
  });

  markdownService.getEditor = function() {
    return _editor;
  }

  return markdownService;

}]);