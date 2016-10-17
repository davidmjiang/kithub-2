class StudentsController < ApplicationController

  def create
    @student = Student.new(student_params)
    respond_to do |format|
      if @student.save
        format.json {render json: @student}
      else
        format.json { render json: {
                                            errors: @student.errors.full_messages },
                                            :status => 422
                                           }
      end
    end
  end

  private

  def student_params
    params.require(:student).permit(:first_name, :last_name, :email, :course_id)
  end

end
