class CoursesController < ApplicationController

  def index
    @courses = current_teacher.courses
    respond_to do |format|
      format.json {render json: @courses}
    end
  end

  def show
    @course = Course.find(params[:id])
    if @course.teacher == current_teacher
      respond_to do |format|
        format.json {render json: @course, include: [{students: {include: :submissions}}, {assignments: {include: :submissions}}]}
      end
      # # use jbuilder instead - see views/courses/show.json.jbuilder
      # respond_to do |format|
      #   format.json {render json: @course, include: [:students, {assignments: {include: :submissions}}]}
      # end
    end
  end

  def create
    @course = current_teacher.courses.build(course_params)
    respond_to do |format|
      if @course.save
        format.json {render json: @course, include: [:students, {assignments: {include: :submissions}}]}
      else
        format.json { render json: {
                                            errors: @course.errors.full_messages },
                                            :status => 422
                                           }
      end
    end
  end

  private

  def course_params
    params.require(:course).permit(:title)
  end

end
