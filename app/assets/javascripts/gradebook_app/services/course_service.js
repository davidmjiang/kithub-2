Gradebook.factory('CourseService', ['Restangular', '$rootScope', function(Restangular, $rootScope){
  var stub = {}
  
  var _courses = [];

  var _removeCourse = function(response) {
    _.each(_courses, function(course, index) {
        if (course.id === response.id) {
          return _courses.splice(index, 1);
        }
      })
  }


  stub.sortRows = function(rows) {
    var students = rows.sort(function(a,b) {
      var lastNameA = a[2];
      var lastNameB = b[2];
      if(lastNameA < lastNameB) {
        return -1;
      }
      if(lastNameB < lastNameA) {
        return 1;
      }
      else {
        return 0;
      }
    })
    return students;
  }

  stub.populateCourses = function() {
    return Restangular.all('courses').getList().then(function(courses) {
      return angular.copy(courses, _courses);
    })
  };

  stub.getCourses = function() {
    if (_courses.length) {
      return _courses;
    } else {
      return stub.populateCourses();
    }
  };

  stub.getCourse = function(id) {
    return Restangular.one('courses', id).get().then(function(response) {
      return response
    });
  };

  stub.addCourse = function(params) {
    return Restangular.all('courses').post(params).then(function(response){
      _courses.push(response)
      return response;
    })
  };

  stub.deleteCourse = function(course) {
    return course.remove().then(function(response) {
      _removeCourse(response);
    })
  }

  stub.updateCourse = function(params, course) {
    Restangular.restangularizeElement(null, course, 'courses');
    course.patch(params).then(function(response){
      var updatedCourse = _.find(_courses, { id: response.id })
      var indexCourse = _.indexOf(_courses, updatedCourse)
      _courses[indexCourse] = response;
    });
  }

  return stub;

}]);
