Gradebook.factory('CourseService', ['Restangular', function(Restangular){

  var _courses = [];

  var stub = {}

  var populateCourses = function() {
    return Restangular.all('courses').getList().then(function(courses) {
      return angular.copy(courses, _courses);
    })
  };

  stub.getCourses = function() {
    if (_courses.length) {
      return _courses;
    } else {
      return populateCourses();
    }
  };

  stub.getCourse = function(id) {
    return Restangular.one('courses', id).get();
  };

  stub.addCourse = function(params) {
    return Restangular.all('courses').post(params).then(function(response){
      angular.copy(populateCourses(), _courses);
      return response
    })
  };

  return stub;

}]);
