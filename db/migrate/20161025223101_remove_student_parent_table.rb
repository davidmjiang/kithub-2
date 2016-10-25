class RemoveStudentParentTable < ActiveRecord::Migration[5.0]
  def change
    drop_table :student_parents
    drop_table :parents
  end
end
