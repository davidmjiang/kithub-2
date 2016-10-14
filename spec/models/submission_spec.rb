require 'rails_helper'

#runs test to check that a valid submission is valid
describe Submission do

  let(:submission){ create(:submission) }

  it "is valid with default attributes" do
    expect(submission).to be_valid
  end

  #testing associations
  it { should belong_to(:assignment) }
  it { should belong_to(:student) }

end