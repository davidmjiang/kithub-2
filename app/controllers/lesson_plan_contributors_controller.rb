class LessonPlanContributorsController < ApplicationController

  def index
    @teacher = Teacher.includes( {lesson_plans_contributed_to: [:forked_plans, :teachers_who_starred] } ).find(params[:teacher_id])
    @lesson_plans = @teacher.lesson_plans_contributed_to
    respond_to do |format|
      format.json {render "lesson_plan_stars/lesson_plans.json.jbuilder"}
    end
  end


  def create
    @past = LessonPlanContributor.where(teacher_id: params[:teacher_id], lesson_plan_id: params[:lesson_plan_id])
    @contribution = LessonPlanContributor.new(contribution_params)
    
    respond_to do |format|
      if @past.length == 0
        if @contribution.save
          format.json { render json: @contribution }
        end
      else
        format.json { render json: @past }
      end
    end
  end

  private

  def contribution_params
    params.permit(:teacher_id, :lesson_plan_id)
  end
end
