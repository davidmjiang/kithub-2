class AddStartAndEndDatesToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :start_date, :datetime
    add_column :courses, :end_date, :datetime
  end
end
