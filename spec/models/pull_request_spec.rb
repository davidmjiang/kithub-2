# require 'rails_helper'

# #runs two tests to check if course is valid with a title and invalid without title
# describe PullRequest do

#   let(:pull_request){ create(:pull_request) }

#   it "is valid with default attributes" do
#     expect(pull_request).to be_valid
#   end

#   it "is invalid without default attributes" do
#     sad_course = build(:course, :without_title)
#     expect(sad_course).to_not be_valid
#   end

#   #testing associations
#   it { should belong_to(:teacher) }
#   it { should have_many(:students) }
#   it { should have_many(:assignments) }

# end