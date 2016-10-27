require 'sendgrid-ruby'

class ParentMailer < ApplicationMailer
	default from: "dylynch91@gmail.com"

	layout "mailer"

	def failing(student, teacher, score)
		@student = student
		@teacher = teacher
		@score = score
		mail = Mail.new(to: @student.email, subject: "Your current progress")
		sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
		sg.client.mail._("send").post(request_body: mail.to_json)
	end

	def exceptional(student, teacher, score)
		@student = student
		@teacher = teacher
		@score = score
		mail(to: @student.email, subject: "Your current progress")
	end
end
