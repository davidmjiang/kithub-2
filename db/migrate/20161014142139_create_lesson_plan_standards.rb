class CreateLessonPlanStandards < ActiveRecord::Migration[5.0]
  def change
    create_table :lesson_plan_standards do |t|
      t.references :lesson_plan
      t.references :standard
      t.timestamps
    end
    add_index :lesson_plan_standards, [:lesson_plan_id, :standard_id], unique: true
  end
end
