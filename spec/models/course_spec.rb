require 'rails_helper'

describe Course do

  let(:course){ create(:course) }

  it "is valid with default attributes" do
    expect(course).to be_valid
  end

  it "is invalid without default attributes" do
    sad_course = build(:course, :without_title)
    expect(sad_course).to_not be_valid
  end

end