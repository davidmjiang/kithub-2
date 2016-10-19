class LessonPlanStarsController < ApplicationController

  def index
    @teacher = Teacher.includes( {starred_lesson_plans: [:forked_plans, :teachers_who_starred] } ).find(params[:teacher_id])
    @lesson_plans = @teacher.starred_lesson_plans
    respond_to do |format|
      format.json {render "lesson_plans.json.jbuilder"}
    end
  end


  def create

  end
end
