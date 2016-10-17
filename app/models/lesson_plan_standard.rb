class LessonPlanStandard < ApplicationRecord
  #join table between lesson plans and standards

  validates :lesson_plan_id, presence: true
  validates :standard_id, presence: true
  belongs_to :lesson_plan
  belongs_to :standard
end
