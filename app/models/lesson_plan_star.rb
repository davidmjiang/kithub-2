class LessonPlanStar < ApplicationRecord

  belongs_to :teacher
  belongs_to :lesson_plan
end
