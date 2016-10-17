require 'rails_helper'

#runs two tests to check if assignment is valid with a title and invalid without title
describe PullRequest do

  let(:pull_request){ create(:pull_request) }

  it "is valid with default attributes" do
    expect(pull_request).to be_valid
  end

  it "is invalid without parent_plan" do
    sad_assignment = build(:pull_request, :no_parent_plan)
    expect(sad_assignment).to_not be_valid
  end

  it "is invalid without forked_plan" do
    sad_assignment = build(:pull_request, :no_forked_plan)
    expect(sad_assignment).to_not be_valid
  end

  #testing associations
  it { should belong_to(:parent_plan) }

  it { should belong_to(:forked_plan) }
  it { should have_many(:comments) }


end