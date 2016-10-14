class ChangeAssignmentTypeName < ActiveRecord::Migration[5.0]
  def change
    rename_column :assignments, :type, :assignment_type
  end
end
