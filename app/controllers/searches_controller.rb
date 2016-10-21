class SearchesController < ApplicationController

  def index
    parsed_params = JSON.parse(params["q"])
    puts parsed_params
    @q = LessonPlan.search(parsed_params)
    @lessons = @q.result(distinct: true)
    respond_to do |format|
      format.json { render json: @lessons }
    end
  end
end
