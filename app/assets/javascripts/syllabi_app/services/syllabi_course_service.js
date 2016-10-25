angular.module('Syllabi').factory('SyllabiCourseService', ['Restangular',  '_', function(Restangular,  _, LessonService) {

  var courseService = {};

  var _courses = [];

  courseService.getCourses = function(){
    if (_courses.length) {
      return _courses;
    } else {
      return populateCourses();
    }
  };


  var populateCourses = function() {
    return Restangular.all('courses').getList().then(function(courses) {
      console.log(courses);
      return angular.copy(courses, _courses);
    })
  };

  return courseService;

}]);
