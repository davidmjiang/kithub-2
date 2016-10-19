class RemoveForksFromLessonPlan < ActiveRecord::Migration[5.0]
  def change
    remove_column :lesson_plans, :forks, :integer
  end
end
