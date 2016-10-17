class PullRequestsController < ApplicationController

  def index
    @pull_requests = LessonPlan.find_by_id(params[:lesson_plan_id]).pull_requests_received

  end

  def create
    @pull_request = LessonPlan.find_by_id(params[:lesson_plan_id]).pull_requests_sent.create(pull_request_params)
    @pull_request.save
  end

  private

  def pull_request_params
    params.require(:pull_request).permit(:title, :description, :parent_plan_id, :forked_plan_id, :status, :accept_reject_time)
  end

end
