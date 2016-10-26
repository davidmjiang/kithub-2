class ContributionsController < ApplicationController
	
	def index
		@current_teacher = Teacher.find(params[:teacher_id])
		@teacher_plans = @current_teacher.lesson_plans
		@plan_dates = @teacher_plans.pluck(:created_at)
		teacher_plan_ids = @teacher_plans.pluck(:id)
		@pull_requests = PullRequest.where("forked_plan_id IN (?) AND status = ?", teacher_plan_ids, "accepted")
		@pull_dates = @pull_requests.pluck(:created_at)
		
		render :json => {lessons: @plan_dates, pull_requests: @pull_dates}

	end

	def create
	end
end
