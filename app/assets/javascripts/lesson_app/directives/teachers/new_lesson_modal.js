"use strict";
angular.module('Lesson').directive("newLessonModal",  ['LessonService', '$state', 'Restangular',
 function(LessonService, $state, Restangular) {
  
  return {
    templateUrl:"lesson_templates/directives/new_lesson_modal.html",
    scope: { 
      teacher: "="
    },
    restrict: "E",
    link: function(scope){
      scope.title = "";
      scope.lessonTypes = LessonService.getLessonTypes();
      scope.newLessonType = scope.lessonTypes[0];
      scope.subjects = LessonService.getSubjects();
      scope.newSubject = scope.subjects[0];

      
      // flag for ajax call
      scope.saving = false;

      scope.createLesson = function(valid) {
        console.log(valid)
        if (valid) {
          scope.saving = true;

          var lesson = {
            title: scope.title,
            content: "",
            version: 1.0,
            hours: 1,
            lesson_type: scope.newLessonType,
            subject: scope.newSubject
          };



          LessonService.create(lesson).then(
            function(response) {
              // success
              scope.saving = false;
              scope.goToLesson(response);
            }, 
            function(response) {
              // error
              // TODO Flash error
              scope.saving = false;
            });
        }

      };

      scope.goToLesson = function(lesson) {
        angular.element(document.querySelector('#newLessonModal')).modal('hide');

        // wait for modal to close
        setTimeout(function() { 
          $state.go("main.lessons.show", {id: lesson.id}); }, 300);
        };
    }
  };

}]);