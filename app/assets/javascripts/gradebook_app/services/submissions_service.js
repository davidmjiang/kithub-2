
Gradebook.factory('SubmissionService', ['Restangular', '$q', function(Restangular, $q){

	var stub = {}

	stub.editSubmission = function(submission) {
		Restangular.one("submissions").customPUT(submission, submission.id)
	}

	Restangular.extendModel("submissions", function(model) {
    model.edit = function(data) {
      model.patch({submissions: data});
    };
    return model;
  });

	return stub

}]);
