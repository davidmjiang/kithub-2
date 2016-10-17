class AddTitleToCourse < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :title, :string
    add_column :courses, :teacher_id, :integer
  end
end
