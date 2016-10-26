"use strict";
angular.module('Lesson').controller('TeacherShowCtrl', ['$scope', 'currentUser', 'teacher', 'Upload', '_', 'Restangular', '$http', 'FollowingService', function($scope, currentUser, teacher, Upload, _, Restangular, $http, FollowingService){

	$scope.isCurrentUser = currentUser.id === teacher.id;
	$scope.teacher = teacher;
	$scope.lessons = teacher.lesson_plans;
	$scope.states = teacher.states;
	$scope.subjects = teacher.subjects;
	$scope.lessonTypes = teacher.lesson_types;
	$scope.teacherEditing = false;
	$scope.stateEditing = false;
	$scope.stateHover = false;
	$scope.imageHover = false;
	$scope.saving = false;
	$scope.changeToIndexState = function(){
    console.log("changing...")
  }; 

	//show profile photo if there is one
	if(teacher.avatar_file_name){
		$scope.profile_photo = teacher.image;
	}
	else{
		$scope.profile_photo = "https://placehold.it/250x250";
	}

	// display editing pencil on hover
	$scope.hoverIn = function(teacher){
		teacher.hoverEdit = true;
	};

	$scope.hoverOut = function(teacher){
		teacher.hoverEdit = false;
	};

	// toggle between displaying name and input types to edit name
	$scope.editTeacher = function(){
		$scope.teacherEditing = !$scope.teacherEditing;
		$scope.tempFirst = $scope.teacher.first_name;
		$scope.tempLast = $scope.teacher.last_name;
		$scope.tempState = $scope.teacher.state;

	};

	$scope.cancelUpdate = function(){
		$scope.teacherEditing = !$scope.teacherEditing;
		$scope.teacher.first_name = $scope.tempFirst;
		$scope.teacher.last_name = $scope.tempLast;
		$scope.teacher.state = $scope.tempState;
	};

	$scope.updateTeacher = function(){
		$scope.teacherEditing = !$scope.teacherEditing;
		$scope.teacher.patch();
	};

	// toggle between showing and editing user's state
	$scope.editState = function(){
		if ($scope.stateEditing === false) {
			$scope.stateEditing = true;
		} else {
			$scope.teacher.patch();
			$scope.stateEditing = false;
		}
	};

	//decide whether to show follow or unfollow
	//check if currentUser follows this user
	$scope.followers = FollowingService.getFollowersOf()[teacher.id];
	var ids = _.map($scope.followers, function(el){
		return el.id;
	});
	$scope.followBtn = !_.includes(ids, currentUser.id);

	$scope.follow = function(){
		FollowingService.create(currentUser, $scope.teacher).then(function(){
			$scope.followedByNum ++;
			$scope.followBtn = false;
		});
	};

	$scope.unfollow = function(){
		FollowingService.delete(currentUser, $scope.teacher).then(function(){
			  $scope.followedByNum --;
				$scope.followBtn = true;
		});
	};

	var followersOf = FollowingService.getFollowersOf();
	var followedBy = FollowingService.getFollowedBy();

	if(followersOf[teacher.id]){
		$scope.followedByNum = followersOf[teacher.id].length;
	}
	else{
		$scope.followedByNum = 0;
	}

	if(followedBy[teacher.id]){
		$scope.followingNum = followedBy[teacher.id].length;
	}
	else{
		$scope.followingNum = 0;
	}

	$scope.$on('follow:new', function(event, args){
		if(args.id === teacher.id){
			$scope.followingNum ++; 	
		}
	});

	$scope.$on('follow:delete', function(event, args){
		if(args.id === teacher.id){
			$scope.followingNum --; 	
		}
	});

	$scope.activeTab = "overview";
	//determine active tab
	$scope.$on('on:page', function(event, args){
		$scope.activeTab = args;
	});

	//upload profile photo
	$scope.upload = function(file){
		$scope.saving = true;
		Upload.upload({
			url: 'api/v1/teachers/' + teacher.id + '.json',
			method: 'PUT',
			headers: {'Content-Type': false},
			fields:{
				"teacher[avatar]": file
			},
			file: file,
			sendFieldsAs: 'json'
		}).then(function(response){
			$scope.profile_photo = response.data.image;
			$scope.imageHover = false;
			$scope.saving = false;
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