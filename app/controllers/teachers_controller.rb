class TeachersController < ApplicationController

  def index

  end

  def show
    @teacher = Teacher.find(params[:id])
    @states = STATES
  end

  def update
  	@teacher = Teacher.find(params[:id])
  	@teacher.update(teacher_params)
    @states = STATES
    render "show.json.jbuilder"
  end

  private
  def teacher_params
  	params.require('teacher').permit(:avatar, :first_name, :last_name, :state)
  end


end
