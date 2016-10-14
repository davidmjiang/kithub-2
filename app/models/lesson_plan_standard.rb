class LessonPlanStandard < ApplicationRecord
  #join table between lesson plans and standards
  belongs_to :lesson_plan
  belongs_to :standard
end
