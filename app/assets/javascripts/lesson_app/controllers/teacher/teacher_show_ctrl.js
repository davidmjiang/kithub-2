"use strict";
angular.module('Lesson').controller('TeacherShowCtrl', ['$scope', 'currentUser', 'teacher', 'Upload', function($scope, currentUser, teacher, Upload){

	$scope.teacher = teacher;
	$scope.lessons = teacher.lesson_plans;
	$scope.states = teacher.states;
	$scope.teacherEditing = false;
	$scope.stateEditing = false;
	$scope.stateHover = false;

	//show profile photo if there is one
	if(teacher.avatar_file_name){
		$scope.profile_photo = teacher.image;
	}
	else{
		$scope.profile_photo = "http://placehold.it/250x250";
	}

	$scope.hoverIn = function(teacher){
		teacher.hoverEdit = true;
	};

	$scope.hoverOut = function(teacher){
		teacher.hoverEdit = false;
	};

	$scope.editTeacher = function(){
		$scope.teacherEditing = !$scope.teacherEditing;
		$scope.tempFirst = $scope.teacher.first_name
		$scope.tempLast = $scope.teacher.last_name
		$scope.tempState = $scope.teacher.state

	};

	$scope.cancelUpdate = function(){
		$scope.teacherEditing = !$scope.teacherEditing;
		$scope.teacher.first_name = $scope.tempFirst
		$scope.teacher.last_name = $scope.tempLast
		$scope.teacher.state = $scope.tempState
	}

	$scope.updateTeacher = function(){
		$scope.teacherEditing = !$scope.teacherEditing;
		$scope.teacher.patch();
	}

	$scope.editState = function(){
		if ($scope.stateEditing === false) {
			$scope.stateEditing = true;
		} else {
			$scope.teacher.patch();
			$scope.stateEditing = false;
		}
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