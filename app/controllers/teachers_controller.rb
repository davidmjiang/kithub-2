class TeachersController < ApplicationController

  def index

  end

  def show
    @teacher = Teacher.includes( { lesson_plans: [:parent_plan, :standards, :forked_plans, :lesson_plan_stars, :teachers_who_starred] }, :followed_by, :following, :starred_lesson_plans, :lesson_plans_contributed_to).find(params[:id])
    @states = STATES
    @lesson_types = LESSON_TYPES
    @subjects = SUBJECTS
  end

  def update
  	@teacher = Teacher.find(params[:id])
    respond_to do |format|
    	if @teacher.update(teacher_params)
        @states = STATES
        @lesson_types = LESSON_TYPES
        @subjects = SUBJECTS
        format.json {render "show.json.jbuilder"}
      else
        format.json {render json: { errors:
                    @teacher.errors.full_messages,
                    :status => 422}
                  }
      end
    end
  end

  private
  def teacher_params
  	params.require('teacher').permit(:avatar, :first_name, :last_name, :state)
  end


end
