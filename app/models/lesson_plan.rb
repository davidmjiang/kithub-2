class LessonPlan < ApplicationRecord

  belongs_to :teacher
  
  # self-association 
  belongs_to :parent_plan, class_name: "LessonPlan"
  has_many :forked_plans, class_name: "LessonPlan", foreign_key: "parent_plan_id"

  #many to many relationship with tags
  has_many :taggings
  has_many :tags, through: :taggings

  #pull request many to many self-association
  has_many :pull_requests_received, foreign_key: :parent_plan_id, class_name: "PullRequest"
  has_many :pull_requests_send, foreign_key: :forked_plan_id, class_name: "PullRequest"

  #many to many relationship with standards
  has_many :lesson_plan_standards
  has_many :standards, through: :lesson_plan_standards

  has_many :comments, as: :commentable
end
