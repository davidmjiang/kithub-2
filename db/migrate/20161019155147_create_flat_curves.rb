class CreateFlatCurves < ActiveRecord::Migration[5.0]
  def change
    create_table :flat_curves do |t|
      t.integer :flat_rate

      t.integer :assignment_id
      t.timestamps
    end
    # add_index :flat_curves, :assignment_id
  end
end
