class Teacher < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :lesson_plans

  # when initiating teacher following
  has_many :initiated_follows, foreign_key: :follower_id, class_name: "TeacherFollowing"
  has_many :following, through: :initiated_follows, source: :followed

  #when receiving teacher following
  has_many :received_follows, foreign_key: :followed_id, class_name: "TeacherFollowing"
  has_many :followed_by, through: :received_follows, source: :follower
end
