class AddMetaToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :meta_id, :integer
    add_column :users, :meta_type, :string

    add_index :users, [:meta_id, :meta_type]
  end
end
