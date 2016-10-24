class ParentMailer < ApplicationMailer
	default from: "dylynch91@gmail.com"

	layout "mailer"

	def failing(student, teacher, score)
		@student = student
		@teacher = teacher
		@score = score
		mail(to: @student.email, subject: "Your child's progress")
	end

	def exceptional(student, teacher, score)
		@student = student
		@teacher = teacher
		@score = score
		mail(to: @student.email, subject: "Your child's progress")
	end
end
