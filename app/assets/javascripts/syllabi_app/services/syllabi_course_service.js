angular.module('Syllabi').factory('SyllabiCourseService', ['Restangular',  '_', function(Restangular,  _) {

  var courseService = {};

  var _courses = [];

  courseService.getCourses = function(){
    if (_courses.length) {
      return _courses;
    } else {
      return populateCourses();
    }
  };

  courseService.getCourse = function(id){
    var course = _.find(_courses, function(course){
      return course.id == id
    });
    if (course === undefined){
      return Restangular.one('courses', id).get();
    } else {
      return course;
    }

  }

  courseService.addLessonPlanDay = function(courseDayId, lessonPlanId) {
    params = {courseDayId: courseDayId, lessonPlanId: lessonPlanId}
    return Restangular.all('lesson_plan_days').post(params)
      .then(function(response){
        return response;
      })
  } 


  var populateCourses = function() {
    return Restangular.all('courses').getList().then(function(courses) {
      return angular.copy(courses, _courses);
    })
  };

  return courseService;

}]);
