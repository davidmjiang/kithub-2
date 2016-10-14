class CreatePullRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :pull_requests do |t|
      t.string :title, null: false
      t.text :description
      t.references :parent_plan, index: true
      t.references :forked_plan, index: true
      t.string :status
      t.datetime :accept_reject_time
      t.timestamps
    end
    add_index :pull_requests, [:parent_plan_id, :forked_plan_id]
  end
end
