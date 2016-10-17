class PullRequestsController < ApplicationController

  def index
    @pull_requests = LessonPlan.find_by_id(params[:lesson_plan_id]).pull_requests_received

  end

  def new
    lesson_plan = LessonPlan.find_by_id(params[:id])
    @pull_requests = lesson_plan.sent_pulls.build({
        parent_plan_id: lesson_plan.parent_plan_id,
        status: "unmerged"
      })
  end

end
