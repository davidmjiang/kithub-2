class AssignmentsController < ApplicationController

  def create
    @assignment = Assignment.new(assignment_params)
    #@assignment.course = Course.find_by_id(params["course_id"])
    @assignment.title = "New Title"
    @assignment.possible_score = 1
    respond_to do |format|
      if @assignment.save
        add_submissions(params["course_id"], @assignment)
        format.json {render json: @assignment, include: :submissions}
      else
        format.json { render json: {
                                            errors: @assignment.errors.full_messages },
                                            :status => 422
                                           }
      end
    end
  end

  

  private

  def assignment_params
    params.require(:assignment).permit(:title, :assignment_type, :possible_score, :course_id)
  end

#Go through course students
#For each course student, add a submission

  def add_submissions(course_id, assignment)
    students = Course.find(course_id).students
    students.each do |student| 
      submission = Submission.create()
      submission.raw_score = 1
      submission.assignment = assignment
      student.submissions << submission
    end

  end


end
