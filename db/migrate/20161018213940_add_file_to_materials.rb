class AddFileToMaterials < ActiveRecord::Migration[5.0]
  def self.up
    change_table :additional_materials do |t|
      t.attachment :material
    end
  end

  def self.down
    remove_attachment :additional_materials, :material
  end
end
