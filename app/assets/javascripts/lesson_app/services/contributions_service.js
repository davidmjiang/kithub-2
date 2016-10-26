"use strict";
angular.module('Lesson').factory('ContributionsService', ['$http', '$q', function($http, $q){

	var obj = {};

	var _contributions = {};

	var addToList = function(collection, id){
		collection.forEach(function(el){
			var date = new Date(el);
			if(_contributions[id][date]){
				_contributions[id][date] += 1;	
			}
			else{
				_contributions[id][date] = 1;
			}
		});
	};

	obj.populate = function(id){
		//if contributions for this user have not been populated yets
		if(!_contributions[id]){
			return $http({
				method: 'GET',
				url: '/api/v1/teachers/'+id+'/contributions',
				headers:{
					'Content-Type': 'application/json'
				}
			}).then(function(response){
				_contributions[id] = {};
				addToList(response.data.lessons, id);
				addToList(response.data.pull_requests, id);
			});
		}
		else{
			return $q.when([]);
		}
	};

	obj.getAll = function(){
		return _contributions;
	};

	return obj;
}]);