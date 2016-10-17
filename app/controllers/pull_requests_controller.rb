class PullRequestsController < ApplicationController

  def index
    @pull_requests = LessonPlan.find_by_id(params[:lesson_plan_id]).pull_requests_received

  end

end
