class AssignmentsController < ApplicationController

  def create
    @assignment = Assignment.new(assignment_params)
    respond_to do |format|
      if @assignment.save
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



end
