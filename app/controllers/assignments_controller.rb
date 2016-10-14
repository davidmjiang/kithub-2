class AssignmentsController < ApplicationController

  def create
    @assignment = Assignment.new(assignment_params)
    if @assignment.save
      respond_to do |format|
        format.json {render json: @assignment, include: :submissions}
      end
    end
  end

  private

  def assignment_params
    params.require(:assignment).permit(:title, :assignment_type, :possible_score, :course_id)
  end

end
