class StudentProgressController < ApplicationController

	def fail
		@student = Student.find_by_id(params[:student_id])
		@score = params[:score]
		@teacher = Teacher.find_by_id(params[:teacher_id])
		ParentMailer.failing(@student, @teacher, @score).deliver
	end

	def exceptional
		@student = Student.find_by_id(params[:student_id])
		@score = params[:score]
		@teacher = Teacher.find_by_id(params[:teacher_id])
		ParentMailer.notification(@student, @teacher, @score).deliver
	end

	def conference

	end

	def notifcation

	end

end
