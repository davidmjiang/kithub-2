class AddColumnsToTeachers < ActiveRecord::Migration[5.0]
  def change
    add_column :teachers, :provider, :string
    add_column :teachers, :uid, :string
  end
end
