class StudentProgressController < ApplicationController

	def fail
		@student = Student.find_by_id(params[:student_id])
		@score = params[:score]
		@teacher = Teacher.find_by_id(params[:teacher_id])
		ParentMailer.failing(@student, @teacher, @score).deliver
    respond_to do |format|
      format.json { render json: @student }
    end
	end

	def exceptional
		@student = Student.find_by_id(params[:student_id])
		@score = params[:score]
		@teacher = Teacher.find_by_id(params[:teacher_id])
		ParentMailer.exceptional(@student, @teacher, @score).deliver
    respond_to do |format|
      format.json { render json: @student }
    end
	end

	def fail_assignment
		@student = Student.find_by_id(params[:student_id])
		@score = params[:score]
		@teacher = Teacher.find_by_id(params[:teacher_id])
		@assignment_name = params[:assignment_name]
		ParentMailer.failing_assignment(@student, @teacher, @score, @assignment_name).deliver
    respond_to do |format|
      format.json { render json: @student }
    end
	end

	def exceptional_assignment
		@student = Student.find_by_id(params[:student_id])
		@score = params[:score]
		@teacher = Teacher.find_by_id(params[:teacher_id])
		@assignment_name = params[:assignment_name]
		ParentMailer.exceptional_assignment(@student, @teacher, @score, @assignment_name).deliver
    respond_to do |format|
      format.json { render json: @student }
    end
	end

end
