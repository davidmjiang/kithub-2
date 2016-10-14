class CreateTeacherFollowings < ActiveRecord::Migration[5.0]
  def change
    create_table :teacher_followings do |t|
      t.references :followed, index: true
      t.references :follower, index: true

      t.timestamps
    end

    add_index :teacher_followings, [:followed_id, :follower_id], unique: true
  end
end
