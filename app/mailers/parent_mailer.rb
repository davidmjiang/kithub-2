require 'sendgrid-ruby'

class ParentMailer < ApplicationMailer
	default from: "dylynch91@gmail.com"

	layout "mailer"

	def failing(student, teacher, score)
		@student = student
		@teacher = teacher
		@score = score
		mail(to: @student.email, subject: "Your current progress")
	end

	def exceptional(student, teacher, score)
		@student = student
		@teacher = teacher
		@score = score
		mail(to: @student.email, subject: "Your current progress")
	end

	def failing_assignment(student, teacher, score, assignment_name)
		@student = student
		@teacher = teacher
		@score = score
		@assignment_name = assignment_name
		mail(to: @student.email, subject: "Your recent assignment")
	end


	def exceptional_assignment(student, teacher, score, assignment_name)
		@student = student
		@teacher = teacher
		@score = score
		@assignment_name = assignment_name
		mail(to: @student.email, subject: "Your recent assignment")
	end
end
