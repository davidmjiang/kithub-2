class CreateSubmissions < ActiveRecord::Migration[5.0]
  def change
    create_table :submissions do |t|
      t.belongs_to :assignment, index: true
      t.belongs_to :student, index: true
      t.integer :raw_score
      t.integer :real_score

      t.timestamps
    end
  end
end
