class TeachersController < ApplicationController

  def index

  end

  def show
    @teacher = Teacher.find(params[:id])
  end
end
