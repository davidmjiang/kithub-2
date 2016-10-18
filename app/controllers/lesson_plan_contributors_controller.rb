class LessonPlanContributorsController < ApplicationController

  def index
    @teacher = Teacher.find(params[:teacher_id])
    @lesson_plans = @teacher.lesson_plans_contributed_to
    respond_to do |format|
      format.json {render json: @lesson_plans, status: 200}
    end
  end


  def create

  end
end
