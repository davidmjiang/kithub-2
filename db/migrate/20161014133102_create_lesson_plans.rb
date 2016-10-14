class CreateLessonPlans < ActiveRecord::Migration[5.0]
  def change
    create_table :lesson_plans do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.references :teacher, index: true
      t.float :hours
      t.float :version, default: 1.0
      t.integer :forks, default: 0
      t.string :state
      t.integer :grade
      t.string :subject
      t.string :lesson_type
      t.references :parent_plan, index: true

      t.timestamps
    end
  end
end
