require 'doc_convert'

class LessonPlansController < ApplicationController

  # Gets all lesson plans for all teachers and returns them in JSON object
  def index
    if params[:q]
      
    else
      @lessons = LessonPlan.all
    end
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
        @lesson.version += 0.1
        @lesson.save
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

    if params[:file]
      file = params[:file]
      @lesson.content = DocConvert.docx_to_markdown(file.tempfile.path)
    end

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

  def destroy
    @lesson = current_teacher.lesson_plans.find(params[:id])

    respond_to do |format|
      if @lesson.destroy
        format.json{render "show.json.jbuilder"}
      else
        format.json { render json: {
                                    errors: @lesson.errors.full_messages },
                                    :status => 422
                                   }
      end
    end
  end

  def export
    @lesson = current_teacher.lesson_plans.find(params[:id])
    content_with_headers = DocConvert.add_headers_to_markdown(@lesson)
    DocConvert.markdown_to_rtf(content_with_headers)
  end

  private

    def lesson_plan_params
      params.require(:lesson_plan).permit(:title, :content, :hours,
                                          :version, :state, :grade,
                                          :subject, :lesson_type, :parent_plan_id)
    end

end
