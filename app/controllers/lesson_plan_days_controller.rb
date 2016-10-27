class LessonPlanDaysController < ApplicationController

  def create
    @lesson_plan_day = LessonPlanDay.new(lesson_plan_day_params)
    respond_to do |format|
      if @lesson_plan_day.save
        format.json {render json: @lesson_plan_day, status: 200}
      else
        format.json{render json: {errors: @lesson_plan_day.errors.full_messages, :status => 422}}
      end
    end
  end

  def destroy
    @lesson_plan_day = LessonPlanDay.find_by lesson_plan_id: params[:lesson_plan_id], course_day_id: params[:course_day_id]
    respond_to do |format|
      if @lesson_plan_day.destroy
        format.json {render json: @lesson_plan_day, status: 201}
      else
        format.json{render json: {errors: @lesson_plan_day.errors.full_messages, :status => 422}}
      end
    end

  end

  private

  def lesson_plan_day_params
    params.require(:lesson_plan_day).permit(:lesson_plan_id, :course_day_id)
  end
end
