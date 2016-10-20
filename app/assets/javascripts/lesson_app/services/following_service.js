"use strict";
angular.module('Lesson').factory('FollowingService', ['Restangular', function(Restangular){

var obj = {};

var _currentFollowings = [];

obj.populateFollowings = function(id){
	return Restangular.all('teacher_followings').customGET("", {follower_id: id}).then(function(response){
			_currentFollowings.push(response);
	});
};

obj.getFollowers = function(id){
	return Restangular.all('teacher_followings').customGET("", {followed_id: id}).then(function(response){
		return response;
	});
};

obj.getFollowings = function(){
	return _currentFollowings;
};

obj.create = function(follower, followed){
	var params = {following: {follower_id: follower.id,
                followed_id: followed.id}};
  return Restangular.all('teacher_followings').post(params).then(function(response){
  	_currentFollowings.push(response);
  });
};

obj.destroy = function(following){
	following.remove().then(function(){
		var index = _currentFollowings.indexOf(following);
		_currentFollowings.splice(index, 1);
	});
};

return obj;

}]);