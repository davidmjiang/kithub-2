angular.module('Lesson').factory("ParentService", ["Restangular", function(Restangular) {

	var ParentService = {};

	ParentService.getParent = function(id) {
		return Restangular.one('parents', id).get().then(function(response){
			return response;
		});
	}

	return ParentService

}])