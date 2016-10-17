require 'rails_helper'

#runs two tests to check if course is valid with a title and invalid without title
describe Course do

  let(:course){ create(:course) }

  it "is valid with default attributes" do
    expect(course).to be_valid
  end

  it "is invalid without default attributes" do
    sad_course = build(:course, :without_title)
    expect(sad_course).to_not be_valid
  end

  #testing associations
  it { should belong_to(:teacher) }
  it { should have_many(:students) }
  it { should have_many(:assignments) }

  describe ".points_possible" do 

    let(:assignment){create(:assignment)}
    let(:num_points){ assignment.possible_score }

    before do 
      course.assignments = [assignment]
    end

    it "returns the total number of points possible" do
      expect(course.points_possible).to eq(num_points)
    end

  end

  describe ".assignment_ids" do 

    let (:assignment_1){create(:assignment)}
    let (:assignment_2){create(:assignment)}
    let (:ids){("#{assignment_1.id}, #{assignment_2.id}")}

    before do 
      course.assignments = [assignment_1, assignment_2]
    end

    it "returns a comma-separated string of assignment ids" do
      expect(course.assignment_ids).to eq(ids)
    end

  end

end