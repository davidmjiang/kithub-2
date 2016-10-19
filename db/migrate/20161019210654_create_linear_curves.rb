class CreateLinearCurves < ActiveRecord::Migration[5.0]
  def change
    create_table :linear_curves do |t|
      t.float :rawA
      t.float :rawB
      t.float :curvedA
      t.float :curvedB

      t.integer :assignment_id
      t.timestamps
    end
    add_index :linear_curves, :assignment_id
  end
end
