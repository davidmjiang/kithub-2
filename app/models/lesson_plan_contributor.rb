class LessonPlanContributor < ApplicationRecord

  # join table between lesson plans and teachers to create list of contributors

  validates :teacher_id, presence: true
  validates :lesson_plan_id, presence: true
  belongs_to :teacher
  belongs_to :lesson_plan
end
