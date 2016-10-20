class LinearCurvesController < ApplicationController

  def create
    @linear_curve = LinearCurve.new(linear_curve_params)
    if @linear_curve.save 
      @linear_curve.assignment.touch
      respond_to do |format|
        format.json { render json: @linear_curve.to_json(include: :assignment), status: 200 }
      end
    end
  end

  def update
    @linear_curve = LinearCurve.find_by_id(params[:id])
    @linear_curve.update(linear_curve_params)
    if @linear_curve.save 
      puts "Updated the linear curve"
      @linear_curve.assignment.touch
    end
  end

  def destroy
    puts "Destroying linear curve..."
    @linear_curve = LinearCurve.find_by_id(params[:id])
    if @linear_curve && @linear_curve.destroy 
      puts "Curve destroyed"
      @linear_curve.assignment.touch
    end
  end

  private 

  def linear_curve_params
    params.require(:linear_curve).permit(:assignment_id, :rawA, :rawB, :curvedA, :curvedB)
  end

end
