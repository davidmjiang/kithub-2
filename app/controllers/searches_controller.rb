class SearchesController < ApplicationController

  def index
    parsed_params = JSON.parse(params["q"])
    @q = LessonPlan.includes([:lesson_plan_stars, :teacher, :teachers_who_starred, :forked_plans]).search(parsed_params)
    @lesson_plans = @q.result(distinct: true)
    respond_to do |format|
      format.json {render "lesson_plan_stars/lesson_plans.json.jbuilder"}
    end
  end
end
