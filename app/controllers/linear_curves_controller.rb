class LinearCurvesController < ApplicationController

  def create
    @linear_curve = LinearCurve.new(linear_curve_params)
    if @linear_curve.save 
      respond_to do |format|
        format.json { render json: @linear_curve, status: 200 }
      end
    end
  end

  def destroy
    puts "Destroying linear curve..."
    @linear_curve = LinearCurve.find_by_id(params[:id])
    curve = @linear_curve
    if @linear_curve && @linear_curve.destroy 
      puts "Curve destroyed"
      respond_to do |format|
        format.json { render json: curve, status: 200 }
      end
    end
  end

  private 

  def linear_curve_params
    params.require(:linear_curve).permit(:assignment_id, :rawA, :rawB, :curvedA, :curvedB)
  end

end
