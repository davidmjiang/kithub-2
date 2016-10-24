class StudentsController < ApplicationController

  def show
    @student = Student.find_by_id(params[:id])
    respond_to do |format|
      format.json {render json: @student, include: [:submissions]}
    end
  end

  def create
    @student = Student.new(student_params)
    @student.first_name.capitalize
    @student.last_name.capitalize
    @student.course_ids = params['course_ids']
    respond_to do |format|
      if @student.save
        create_submissions(params["course_ids"], @student.id)
        format.json {render json: @student, include: [:submissions]}
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
    @student = Student.find_by_id(params[:id])
    respond_to do |format|
      if @student.update(student_params)
        format.json {render json: @student}
      else
        format.json { render json: {
                                            errors: @student.errors.full_messages },
                                            :status => 422
                                           }
      end
    end
  end

  def destroy
    @student = Student.find(params[:id])
    respond_to do |format|
      if @student.destroy
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
    params.require(:student).permit(:first_name, :last_name, :email, :notes, course_ids: [])
  end


  def create_submissions(course_id, student_id)
    student = Student.find_by_id(student_id)
    a = Course.find_by_id(course_id).assignments
    a.each do |assignment|
      submission = Submission.create()
      submission.raw_score = 0
      submission.assignment_id = assignment.id
      student.submissions << submission
    end
  end

end
