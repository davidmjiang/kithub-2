class TeacherFollowing < ApplicationRecord

  #the initiator side
  belongs_to :follower, foreign_key: :follower_id,
                                class_name: "Teacher"

  # the recipient side
  belongs_to :followed, foreign_key: :followed_id, 
                                class_name: "Teacher"
end
