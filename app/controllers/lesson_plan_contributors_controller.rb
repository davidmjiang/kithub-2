class LessonPlanContributorsController < ApplicationController

  def index
    @teacher = Teacher.includes( {lesson_plans_contributed_to: [:forked_plans, :teachers_who_starred] } ).find(params[:teacher_id])
    @lesson_plans = @teacher.lesson_plans_contributed_to
    respond_to do |format|
      format.json {render "lesson_plan_stars/lesson_plans.json.jbuilder"}
    end
  end


  def create

  end
end
