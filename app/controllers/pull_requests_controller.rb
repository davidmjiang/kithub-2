class PullRequestsController < ApplicationController

  def index
    @pull_requests = LessonPlan.find_by_id(params[:lesson_plan_id]).pull_requests_received
    respond_to do |format|
      format.json { render json: @pull_requests }
    end
  end

  def create
    @pull_request = LessonPlan.find_by_id(params[:lesson_plan_id])
                      .pull_requests_sent
                      .create(pull_request_params)
    respond_to do |format|
      if @pull_request.save
        format.json { render json: @pull_request }
      else
        format.json { render json: {
                                    errors: @pull_request.errors.full_messages },
                                    :status => 422
                                   }
      end
    end

  end

  private

  def pull_request_params
    params.require(:pull_request).permit(:title, :description, :parent_plan_id, :forked_plan_id, :status, :accept_reject_time)
  end

end
