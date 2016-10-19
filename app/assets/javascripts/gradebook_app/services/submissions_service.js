
Gradebook.factory('SubmissionService', ['Restangular', '$q', function(Restangular, $q){

	var stub = {}


  var _linearFormula = function(input, rawPercent) {
    return input.curvedA + (((input.curvedB - input.curvedA)/(input.rawB - input.rawA)) * (rawPercent - input.rawA));
  }


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
