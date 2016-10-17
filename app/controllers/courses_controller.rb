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
    end
  end

  def create
    @course = current_teacher.courses.build(course_params)
    if current_teacher.save
      respond_to do |format|
        format.json {render json: @course, include: [:students, {assignments: {include: :submissions}}]}
      end
    end
  end

  private

  def course_params
    params.require(:course).permit(:title)
  end

end
