class CreateCourseDays < ActiveRecord::Migration[5.0]
  def change
    create_table :course_days do |t|
      t.datetime :date
      t.references :course

      t.timestamps
    end
  end
end
