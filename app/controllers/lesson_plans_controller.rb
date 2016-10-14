class LessonPlansController < ApplicationController

  # Gets all lesson plans for all teachers and returns them in JSON object
  def index
    @lessons = LessonPlan.all

    respond_to do |format|
      format.json { render json: @lessons }
    end

  end

end
