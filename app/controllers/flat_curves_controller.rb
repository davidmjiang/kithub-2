class FlatCurvesController < ApplicationController

  def create
    puts "YOU MADE IT HERE"
    @flat_curve = FlatCurve.new(flat_curve_params)
    if @flat_curve.save 
      respond_to do |format|
        format.json { render json: @flat_curve, status: 200 }
      end
    end
  end


  private 

  def flat_curve_params
    params.require(:flat_curve).permit(:assignment_id, :flat_rate)
  end

end
