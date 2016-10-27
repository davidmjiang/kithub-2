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
end
