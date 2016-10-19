class CreateAdditionalMaterials < ActiveRecord::Migration[5.0]
  def change
    create_table :additional_materials do |t|
    	t.integer :lesson_plan_id
      t.timestamps
    end
  end
end
