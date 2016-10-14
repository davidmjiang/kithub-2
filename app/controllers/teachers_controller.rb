class TeachersController < ApplicationController

  def index

  end

  def show
    @teacher = Teacher.find(params[:id])
  end

  def update
  	@teacher = Teacher.find(params[:id])
  	@teacher.update(teacher_params)

  	respond_to do |format|
  		format.json{ render json: @teacher}
  	end
  end

  private
  def teacher_params
  	params.require('teacher').permit(:avatar)
  end


end
