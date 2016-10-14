class LessonPlanContributor < ApplicationRecord

  # join table between lesson plans and teachers to create list of contributors

  belongs_to :teacher
  belongs_to :lesson_plan
end
