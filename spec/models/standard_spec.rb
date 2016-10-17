require 'rails_helper'

describe Standard do

  it { should validate_presence_of (:title)}

  it { should have_many (:lesson_plan_standards)}
  it { should have_many(:lesson_plans).through(:lesson_plan_standards)}

end