class CreateTaggings < ActiveRecord::Migration[5.0]
  def change
    create_table :taggings do |t|
      t.references :lesson_plan, index: true, null: false
      t.references :tag, index: true, null: false
      t.timestamps
    end
    add_index :taggings, [:lesson_plan_id, :tag_id], unique: true
  end
end
