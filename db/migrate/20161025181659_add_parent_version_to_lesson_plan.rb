class AddParentVersionToLessonPlan < ActiveRecord::Migration[5.0]
  def change
    add_column :lesson_plans, :parent_version, :float, default: 0
  end
end
