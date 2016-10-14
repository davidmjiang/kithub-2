class CreateLessonPlanContributors < ActiveRecord::Migration[5.0]
  def change
    create_table :lesson_plan_contributors do |t|
      t.references :teacher
      t.references :lesson_plan
      t.timestamps
    end
    add_index :lesson_plan_contributors, [:teacher_id, :lesson_plan_id], unique: true
  end
end
