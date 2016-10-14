class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.text :body
      t.references :teacher, index: true
      t.integer :commentable_id
      t.string :commentable_type
      t.timestamps
    end
    add_index :comments, [:commentable_type, :commentable_id]
  end
end
