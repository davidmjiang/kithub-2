class CreateLessonPlanDays < ActiveRecord::Migration[5.0]
  def change
    create_table :lesson_plan_days do |t|
      t.references :lesson_plan
      t.references :course

      t.timestamps
    end
  end
end
