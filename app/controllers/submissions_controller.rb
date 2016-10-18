class SubmissionsController < ApplicationController

  def create
    @submission = Submission.new(submission_params)
    respond_to do |format|
      if @submission.save
        format.json {render json: @submission}
      else
        format.json { render json: {
                                            errors: @submission.errors.full_messages },
                                            :status => 422
                                           }
      end
    end
  end


  def update
    @submission = Submission.find_by_id(params[:id])
    respond_to do |format|
      if @submission.update(submission_params)
        format.json {render json: @submission}
      else
        format.json { render json: {
                                            errors: @submission.errors.full_messages },
                                            :status => 422
                                           }
      end
    end
  end

  def index
    # for API call for data visualizations - perhaps this should be a non-RESTful route    
    @submissions = current_teacher_submissions
    respond_to do |format|
      format.json { render json: @submissions, status: 200 }
    end
  end

  private

  def submission_params
    params.require(:submission).permit(:raw_score, :real_score, :assignment_id, :student_id)
  end

  def current_teacher_submissions
    courses = current_teacher.courses
    assignments = []
    courses.each do |course|
      assignments.push(course.assignments)
    end
    assignments.flatten!
    submissions = []
    assignments.each do |assignment|
      submissions.push(assignment.submissions)
    end
    submissions.flatten!
  end

end
