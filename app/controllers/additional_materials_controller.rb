class AdditionalMaterialsController < ApplicationController

	def index
	end

	def create
		@lesson = LessonPlan.find(params[:lesson_plan_id])
		@material = @lesson.additional_materials.build(am_params)
		respond_to do |format|
			if @material.save
				format.json{render "create.json.jbuilder"}
			else
				format.json{render json: {errors: @material.errors.full_messages, :status => 422}}
			end
		end

	end

	def destroy
		@material = AdditionalMaterial.find(params[:id])
		@material.destroy
	end

	private
	def am_params
		params.require('additional_material').permit(:material)
	end
end
