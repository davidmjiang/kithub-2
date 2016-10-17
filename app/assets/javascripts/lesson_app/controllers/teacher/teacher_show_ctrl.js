"use strict";
angular.module('Lesson').controller('TeacherShowCtrl', ['$scope', 'currentUser', 'teacher', 'Upload', function($scope, currentUser, teacher, Upload){

	$scope.teacher = teacher;
	$scope.lessons = teacher.lesson_plans;
	$scope.states = teacher.states;

	//show profile photo if there is one
	if(teacher.avatar_file_name){
		$scope.profile_photo = teacher.image;
	}
	else{
		$scope.profile_photo = "http://placehold.it/250x250";
	}

	//upload profile photo
	$scope.upload = function(file){
		Upload.upload({
			url: 'api/v1/teachers/' + teacher.id + '.json',
			method: 'PUT',
			headers: {'Content-Type': false},
			fields:{
				"teacher[avatar]": file
			},
			file: file,
			sendFieldsAs: 'json'
		}).then(function(){
			console.log("success");
		}, function(response){
			console.log("error: ", response.status);
		},
		function(evt){
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		});
	};

}]);