require 'rails_helper'

#runs test to check student is valid with attributes
describe Student do

  let(:student){ create(:student) }

  it "is valid with default attributes" do
    expect(student).to be_valid
  end

  # it "is invalid without default attributes" do
  #   sad_student = build(:student, :without_email)
  #   expect(sad_student).to_not be_valid
  # end

  #testing associations
  it { should have_many(:submissions) }
  it { should have_many(:assignments) }
  it { should have_many(:courses) }

end