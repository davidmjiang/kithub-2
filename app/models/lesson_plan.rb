class LessonPlan < ApplicationRecord

  belongs_to :teacher
  
  # self-association 
  belongs_to :parent_plan, class_name: "LessonPlan", optional: true
  has_many :forked_plans, class_name: "LessonPlan", foreign_key: "parent_plan_id"

  #many to many relationship with tags
  has_many :taggings
  has_many :tags, through: :taggings

  #pull request many to many self-association
  has_many :pull_requests_received, foreign_key: :parent_plan_id, class_name: "PullRequest"
  has_many :pull_requests_sent, foreign_key: :forked_plan_id, class_name: "PullRequest"

  #many to many relationship with standards
  has_many :lesson_plan_standards
  has_many :standards, through: :lesson_plan_standards

  has_many :comments, as: :commentable

  #many to many relationship with teachers who star
  has_many :lesson_plan_stars
  has_many :teachers_who_starred, through: :lesson_plan_stars

  #many to many relationship for plans teacher is contributor
  has_many :lesson_plan_contributors
  has_many :contributors, through: :lesson_plan_contributors
end
