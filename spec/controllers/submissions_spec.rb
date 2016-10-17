require 'rails_helper'

describe SubmissionsController do

  let(:teacher){create :teacher}
  let(:student){create :student}
  let(:assignment){create :assignment}

  describe "POST #create" do


    before do
      sign_in teacher
    end

    it 'will return successful response with valid attributes' do
      process :create, method: :post,
              params: { :submission => {student_id: student.id, assignment_id: assignment.id}},
              :format => :json
      expect(response).to be_success
    end

    it 'will create lesson in database with valid attributes' do
      expect {
      process :create, method: :post,
              params: { :submission => {student_id: student.id, assignment_id: assignment.id}},
              :format => :json
      }.to change{Submission.count}.by(1)
    end

  end

end