class SearchesController < ApplicationController

  def index
    parsed_params = JSON.parse(params["q"])
    puts parsed_params
    @currentUser = current_teacher
    term = parsed_params["searchTerm"]
    if parsed_params["searchType"] == "name"
      @teachers = Teacher.fuzzy_search({first_name: term, last_name: term, email: term}, false)
      respond_to do |format|
        format.json {render 'teachers.json.jbuilder'}
      end
    else 
      if parsed_params["searchType"] == "title"
        @lesson_plans = LessonPlan.includes([:lesson_plan_stars, :teacher, :teachers_who_starred, :forked_plans]).fuzzy_search(title: term)
      else
        @lesson_plans = LessonPlan.includes([:lesson_plan_stars, :teacher, :teachers_who_starred, :forked_plans]).basic_search(content: term)
      end
      respond_to do |format|
        format.json {render "lesson_plan_stars/lesson_plans.json.jbuilder"}
      end
    end
  end
end
