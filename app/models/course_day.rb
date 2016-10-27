class CourseDay < ApplicationRecord

  belongs_to :course
  has_many :lesson_plan_days
  has_many :lesson_plans, through: :lesson_plan_days
end
