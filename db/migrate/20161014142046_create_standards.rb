class CreateStandards < ActiveRecord::Migration[5.0]
  def change
    create_table :standards do |t|
      t.string :title, null: false
      t.string :state
      t.string :subject

      t.timestamps
    end
  end
end
