class AddDefautltsToAssignements < ActiveRecord::Migration[5.0]
  def change
    change_column_default :assignments, :title, "Default"
    change_column_default :assignments, :possible_score, 0
  end
end
