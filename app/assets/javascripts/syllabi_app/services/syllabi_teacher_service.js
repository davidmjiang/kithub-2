angular.module('Syllabi').factory('SyllabiTeacherService', ['Restangular',  '_', function(Restangular,  _) {

  var teacherService = {};

  var _teachers = {};

  teacherService.getTeacher = function(id){
  if(_teachers[id]){
    return _teachers[id];
  }
  else{
    return Restangular.one('teachers', id).get().then(function(response){
      _teachers[id] = response;
      return response;
    });
  }
};

  return teacherService;

}]);
