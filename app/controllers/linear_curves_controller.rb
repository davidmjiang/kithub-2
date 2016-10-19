class LinearCurvesController < ApplicationController

  def create
    puts "YOU MADE IT"
    @linear_curve = LinearCurve.new(linear_curve_params)
    if @linear_curve.save 
      respond_to do |format|
        format.json { render json: @linear_curve, status: 200 }
      end
    end
  end


  private 

  def linear_curve_params
    params.require(:linear_curve).permit(:assignment_id, :rawA, :rawB, :curvedA, :curvedB)
  end

end
