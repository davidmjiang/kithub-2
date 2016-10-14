class CreateAssignments < ActiveRecord::Migration[5.0]
  def change
    create_table :assignments do |t|
      t.string :title
      t.string :type
      t.integer :possible_score
      t.integer :course_id

      t.timestamps
    end
  end
end
