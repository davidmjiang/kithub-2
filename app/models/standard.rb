class Standard < ApplicationRecord

  validates :title, presence: true
  

  # many to many relationship with lesson plans
  has_many :lesson_plan_standards
  has_many :lesson_plans, through: :lesson_plan_standards
end
