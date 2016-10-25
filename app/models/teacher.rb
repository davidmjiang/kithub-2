class Teacher < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, on: :create
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :state, inclusion: {in: STATES}, allow_nil: true


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:facebook]

  has_many :lesson_plans

  # when initiating teacher following
  has_many :initiated_follows, foreign_key: :follower_id, class_name: "TeacherFollowing"
  has_many :following, through: :initiated_follows, source: :followed

  #when receiving teacher following
  has_many :received_follows, foreign_key: :followed_id, class_name: "TeacherFollowing"
  has_many :followed_by, through: :received_follows, source: :follower

  has_many :comments

  #many to many relationship for lesson plan teachers have starred
  has_many :lesson_plan_stars
  has_many :starred_lesson_plans, through: :lesson_plan_stars,
  class_name: "LessonPlan", source: :lesson_plan

  #many to many relationship for plans teacher is contributor
  has_many :lesson_plan_contributors
  has_many :lesson_plans_contributed_to, through: :lesson_plan_contributors,
  class_name: "LessonPlan", source: :lesson_plan

  #one to many relationship for courses
  has_many :courses

  #paperclip for photo attachment
  has_attached_file :avatar,
                    :styles => {profile: "300 x300"}
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |teacher|
        teacher.provider = auth.provider
        teacher.uid = auth.uid
        teacher.email = auth.info.email
        teacher.password = Devise.friendly_token[0,20]
      end
  end
end
