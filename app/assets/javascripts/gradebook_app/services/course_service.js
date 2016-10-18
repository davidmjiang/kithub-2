Gradebook.factory('CourseService', ['Restangular', function(Restangular){

  var _courses = [];

  var _removeCourse = function(response) {
    _.each(_courses, function(course, index) {
        if (course.id === response.id) {
          return _courses.splice(index, 1)
        }
      })
  }

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

  stub.deleteCourse = function(course) {
    return course.remove().then(function(response) {
      _removeCourse(response)
    })
  }

  return stub;

}]);
