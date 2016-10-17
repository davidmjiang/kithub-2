require 'rails_helper'

describe LessonPlanStandard do

  it { should validate_presence_of (:standard_id)}
  it { should validate_presence_of (:lesson_plan_id)}
  it { should belong_to (:standard)}
  it { should belong_to (:lesson_plan)}

end