class StudentsController < ApplicationController

  def show
    @student = Student.find_by_id(params[:id])
    respond_to do |format| 
      format.json {render json: @student, include: [:submissions]}
    end
  end

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
                                           puts @student.errors.full_messages
      end
    end
  end

  def update
    @student = Student.find(params[:id])
    if @student.update(student_params)
      respond_to do |format|
        format.json {render json: @student}
      end
    end
  end

  private

  def student_params
    params.require(:student).permit(:first_name, :last_name, :email, :notes, course_ids: [])
  end

end
