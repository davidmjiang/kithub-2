Gradebook.factory('AssignmentService', ['Restangular', function(Restangular){
	var stub = {}

	stub.addAssignment = function(course) {
		// var assignment = {}
  //   assignment.course_id = course.id
    return Restangular.all("assignments").post({course_id: course.id}).then(function(createAssignment) {
      return createAssignment;
    })
	}

	Restangular.extendModel("assignments", function(model) {
    model.edit = function(data) {
      model.patch({assignment: data});
    };
    return model;
  });

	return stub;

}])