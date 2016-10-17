require 'rails_helper'

describe PullRequest do

  it { should validate_presence_of (:parent_plan_id)}
  it { should validate_presence_of (:forked_plan_id)}

  it { should belong_to (:parent_plan)}
  it { should belong_to (:forked_plan)}
  it { should have_many (:comments)}

end