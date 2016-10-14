"use strict";
angular.module('Lesson').factory('TeacherService',[ 'Restangular', function(Restangular){

var obj = {};

var _teachers = {};

obj.getTeacher = function(id){
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

obj.updateTeacher = function(id, data){
	for(var attr in data){
		_teachers[id][attr] = data[attr];
	}
};

obj.getTeachers = function(){
	return _teachers;
};

return obj;

}]); 