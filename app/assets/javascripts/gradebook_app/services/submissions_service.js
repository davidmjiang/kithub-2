
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

  // transitioning over to curves service. this function will be deprecated
  stub.applyFlatCurve = function(flatRate, assignmentId) {
    var requests = []
    _.each(submissions, function(submission) {
      var realScore = ((submission.raw_score / pointsPossible) * 100) + flatRate;
      Restangular.restangularizeElement(null, submission, 'submissions')
      requests.push(submission.patch({real_score: realScore}))
    })
    return $q.all(requests)
  }

  stub.applyLinearCurve = function(submissions, input, pointsPossible) {
    var requests = []
    _.each(submissions, function(submission) {
      var rawPercent = submission.raw_score/pointsPossible * 100
      var realScore = _linearFormula(input, rawPercent)
      Restangular.restangularizeElement(null, submission, 'submissions')
      requests.push(submission.patch({real_score: realScore}))
    })
    return $q.all(requests)
  }

	return stub

}]);
