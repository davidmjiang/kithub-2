class CreateContributions < ActiveRecord::Migration[5.0]
  def change
    create_table :contributions do |t|
    	t.string :type
    	t.date :date
      t.timestamps
    end
  end
end
