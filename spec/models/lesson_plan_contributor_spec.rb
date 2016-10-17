require 'rails_helper'


describe LessonPlanContributor do


  it { should validate_presence_of (:teacher_id)}
  it { should validate_presence_of (:lesson_plan_id)}
  it { should belong_to (:teacher)}
  it { should belong_to (:lesson_plan)}

end