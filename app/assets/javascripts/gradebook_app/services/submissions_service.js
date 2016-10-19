
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

  stub.applyFlatCurve = function(submissions, flatRate, pointsPossible) {
    var requests = []
    _.each(submissions, function(submission) {
      var realScore = ((submission.raw_score / pointsPossible) * 100) + flatRate;
      Restangular.restangularizeElement(null, submission, 'submissions')
      requests.push(submission.patch({real_score: realScore}))
    })
    return $q.all(requests).then(function(response) {
      return response
    })
  }

	return stub

}]);