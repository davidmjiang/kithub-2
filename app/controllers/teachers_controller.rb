class TeachersController < ApplicationController

  def index

  end

  def show
    @teacher = Teacher.find(params[:id])
    @states = STATES
  end

  def update
  	@teacher = Teacher.find(params[:id])
    respond_to do |format|
    	if @teacher.update(teacher_params)
        @states = STATES
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
