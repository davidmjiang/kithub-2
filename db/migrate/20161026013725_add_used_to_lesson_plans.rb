class AddUsedToLessonPlans < ActiveRecord::Migration[5.0]
  def change
    add_column :lesson_plans, :used, :boolean
  end
end
