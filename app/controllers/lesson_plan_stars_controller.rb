class LessonPlanStarsController < ApplicationController

  def index
    @teacher = Teacher.find(params[:teacher_id])
    @lesson_plans = @teacher.starred_lesson_plans
    respond_to do |format|
      format.json {render json: @lesson_plans, status: 200}
    end
  end


  def create

  end
end
