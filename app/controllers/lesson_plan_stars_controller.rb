class LessonPlanStarsController < ApplicationController

  def index
    @teacher = Teacher.includes( {starred_lesson_plans: [:forked_plans, :teachers_who_starred] } ).find(params[:teacher_id])
    @lesson_plans = @teacher.starred_lesson_plans
    respond_to do |format|
      format.json {render "lesson_plans.json.jbuilder"}
    end
  end


  def create
    @lesson = LessonPlan.find(params[:lesson_plan_id])
    @star  = @lesson.lesson_plan_stars.build(teacher_id: current_teacher.id)
    respond_to do |format|
      if @star.save
        format.json { render json: @lesson }
      else
        format.json { render json: {
                                    errors: @star.errors.full_messages },
                                    :status => 422
                                   }
      end
    end
  end

  def destroy
    @lesson = LessonPlan.find(params[:lesson_plan_id])
    @star = LessonPlanStar.find_by(teacher_id: params[:id], lesson_plan_id: params[:lesson_plan_id])
    @star.destroy
    respond_to do |format|
      format.json { render json: @lesson }
    end
  end
end
