class SubmissionsController < ApplicationController

  def create
    @submission = Submission.new(submission_params)
    if @submission.save
      respond_to do |format|
        format.json {render json: @submission}
      end
    end
  end

  private

  def submission_params
    params.require(:submission).permit(:raw_score, :real_score, :assignment_id, :student_id)
  end

end
