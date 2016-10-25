class LessonPlanDay < ApplicationRecord

  belongs_to :lesson_plan
  belongs_to :course_day

end
