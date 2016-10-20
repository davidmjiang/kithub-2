angular.module('Lesson').factory('LessonStarService', ['Restangular', 'TeacherService', '_', 'LessonService', function(Restangular, TeacherService, _, LessonService) {

  var newStar = function(lesson_id, current_teacher_id) {
    return Restangular.one('lesson_plans', lesson_id).all('lesson_plan_stars').post().then(function(response) {
      TeacherService.getTeacher(current_teacher_id).starred_lesson_plans.push(response)
      //DO update number of stars on lesson plans
      return response
    })
  };

  var removeStar = function(lesson_id, current_teacher_id) {
    return Restangular.one('lesson_plans', lesson_id).one('lesson_plan_stars', current_teacher_id).remove().then(function(response) {
      //DO update number of stars on lesson plans
      return _.remove(TeacherService.getTeacher(current_teacher_id).starred_lesson_plans, function(currentLesson) {
        return currentLesson.id === response.id
      });
    });
  }

  return {
    newStar: newStar,
    removeStar: removeStar
  }

}]);
