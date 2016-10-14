require 'rails_helper'

#runs two tests to check if assignment is valid with a title and invalid without title
describe Assignment do

  let(:assignment){ create(:assignment) }

  it "is valid with default attributes" do
    expect(assignment).to be_valid
  end

  it "is invalid without default attributes" do
    sad_assignment = build(:assignment, :without_title)
    expect(sad_assignment).to_not be_valid
  end

  #testing associations
  it { should belong_to(:course) }
  it { should have_many(:submissions) }
  it { should have_many(:students) }

end