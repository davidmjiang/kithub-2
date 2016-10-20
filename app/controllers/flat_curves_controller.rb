class FlatCurvesController < ApplicationController

  def create
    @flat_curve = FlatCurve.new(flat_curve_params)
    if @flat_curve.save 
      respond_to do |format|
        format.json { render json: @flat_curve, status: 200 }
      end
    end
  end

  def update
    @flat_curve = FlatCurve.find_by_id(params[:id])
    @flat_curve.update(flat_curve_params)
    if @flat_curve.save
      puts "Updated the flat curve"
    end
  end

  def destroy
    puts "Destroying flat curve..."
    @flat_curve = FlatCurve.find_by_id(params[:id])
    if @flat_curve && @flat_curve.destroy 
      puts "Curve destroyed"
    end
  end


  private 

  def flat_curve_params
    params.require(:flat_curve).permit(:assignment_id, :flat_rate)
  end

end
