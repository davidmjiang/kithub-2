require 'rails_helper'

describe Tagging do

  it { should validate_presence_of (:tag_id)}
  it { should validate_presence_of (:lesson_plan_id)}

  it { should belong_to (:lesson_plan)}
  it { should belong_to (:tag)}

end