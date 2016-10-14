class LessonPlansController < ApplicationController

  # Gets all lesson plans for all teachers and returns them in JSON object
  def index
    @lessons = LessonPlan.all

    respond_to do |format|
      format.json { render json: @lessons }
    end

  end

  def create
    @lesson_plan = current_teacher.lesson_plans.build(lesson_plan_params)
    respond_to do |format|
      if @lesson_plan.save
        format.json { render json: @lesson_plan }
      else
        format.json { render json: {
                                    errors: @lesson_plan.errors.full_messages },
                                    :status => 422
                                   }
      end
    end
  end

  private

    def lesson_plan_params
      params.require(:lesson_plan).permit(:title, :content, :hours,
                                          :version, :state, :grade,
                                          :subject, :lesson_type)
    end

end
