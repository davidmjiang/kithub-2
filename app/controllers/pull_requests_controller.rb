class PullRequestsController < ApplicationController

  def index
    @pull_requests = LessonPlan.find_by_id(params[:lesson_plan_id]).pull_requests_received
  end

  def create
    forked_lesson_plan = LessonPlan.find_by_id(params[:lesson_plan_id])
    @pull_request = forked_lesson_plan.pull_requests_sent.build(pull_request_params)
    @pull_request.parent_plan_id = forked_lesson_plan.parent_plan_id
    @pull_request.save
  end

  def update
    @pull_request = PullRequest.find_by_id(params[:id])


    if @pull_request.update(pull_request_params)
      respond_to do |format|
         format.json { render json: @pull_request, status: 200 }
      end
    end
  end

  private

  def pull_request_params
    params.require(:pull_request).permit(:title, :description, :parent_plan_id, :forked_plan_id, :status, :accept_reject_time)
  end

end
