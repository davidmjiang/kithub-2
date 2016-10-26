"use strict";
angular.module('Lesson').factory('FollowingService', ['Restangular', '$http', '_', '$q', function(Restangular, $http, _, $q){

var obj = {};

var _followersOf = {};

var _followedBy = {};

obj.populate = function(id){
	if(!_followersOf[id] && !_followedBy[id]){
		var promise1 = Restangular.all("teacher_followings").customGET("", {followed_id: id}).then(function(response){
				response.teachers.forEach(function(el){
					if(_followersOf[id]){
						_followersOf[id].push(el);
					}
					else{
						_followersOf[id] = [el];
					}
				});
		});
		var promise2 = Restangular.all("teacher_followings").customGET("", {follower_id: id}).then(function(response){
				response.teachers.forEach(function(el){
					if(_followedBy[id]){
						_followedBy[id].push(el);
					}
					else{
						_followedBy[id] = [el];
					}
				});
		});
		return $q.all(promise1, promise2);
	}
 else{
 	return $q.when([]);
 }
};

obj.create = function(t1, t2){
	var params = {following: {follower_id: t1.id,
			followed_id: t2.id}};
	return Restangular.all("teacher_followings").post(params).then(function(response){
		if(_followersOf[response.t2.id]){
			_followersOf[response.t2.id].push(response.t1);
		}
		else{
			_followersOf[response.t2.id] = [response.t1];
		}
		if(_followedBy[response.t1.id]){
			_followedBy[response.t1.id].push(response.t2);
		}
		else{
			_followedBy[response.t1.id] = [response.t2];
		}
	});
};

obj.delete = function(t1, t2){
	return $http.delete('api/v1/teacher_followings/0', 
			{params: {'follower_id': t1.id, 'followed_id': t2.id}}).then(function(){
	//then splice from the appropriate array
	_.remove(_followersOf[t2.id], function(el){
		return el.id === t1.id;
	});
	_.remove(_followedBy[t1.id], function(el){
		return el.id === t2.id;
	});
});
	
};

obj.getFollowersOf = function(){
	return _followersOf;
};

obj.getFollowedBy = function(){
	return _followedBy;
};

//check if t1 is a follower of t2
obj.checkFollowing = function(t1, t2){
	var ids = _.map(_followersOf[t2.id], function(el){
		return el.id;
	});
	return _.includes(ids, t1.id);
};

return obj;

}]);