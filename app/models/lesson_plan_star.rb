class LessonPlanStar < ApplicationRecord

  belongs_to :teacher
  belongs_to :lesson_plan
  validates :lesson_plan_id, presence: true
  validates :teacher_id, presence: true

end
