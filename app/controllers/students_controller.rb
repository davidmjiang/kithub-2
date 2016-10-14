class StudentsController < ApplicationController

  def create
    @student = Student.new(student_params)
    if @student.save
      respond_to do |format|
        format.json {render json: @student}
      end
    end
  end

  private

  def student_params
    params.require(:student).permit(:first_name, :last_name, :email, :course_id)
  end

end
