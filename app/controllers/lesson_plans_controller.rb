class LessonPlansController < ApplicationController

  # Gets all lesson plans for all teachers and returns them in JSON object
  def index
    @lessons = LessonPlan.all

    respond_to do |format|
      format.json { render json: @lessons }
    end

  end

  def show
    @lesson = LessonPlan.find(params[:id])
    respond_to do |format|
      format.json{render "show.json.jbuilder"}
    end
  end

  def update
    @lesson = current_teacher.lesson_plans.find(params[:id])

    respond_to do |format|
      if @lesson.update(lesson_plan_params)
        format.json{render "show.json.jbuilder"}
      else
        format.json { render json: {
                                    errors: @lesson.errors.full_messages },
                                    :status => 422
                                   }
      end
    end
  end

  # Creates a new lesson based on API call from App. Responds with the newly created lesson if successful, responds with error message and status if not.
  def create
    @lesson = current_teacher.lesson_plans.build(lesson_plan_params)

    respond_to do |format|
      if @lesson.save
        format.json{render "show.json.jbuilder"}
      else
        puts @lesson.errors.full_messages
        format.json { render json: {
                                    errors: @lesson.errors.full_messages },
                                    :status => 422
                                   }
      end
    end
  end

  private

    def lesson_plan_params
      params.require(:lesson_plan).permit(:title, :content, :hours,
                                          :version, :state, :grade,
                                          :subject, :lesson_type, :parent_plan_id)
    end

end
