require 'rails_helper'

describe AssignmentsController do

  let(:teacher){create :teacher}
  let(:course){create :course}

  describe "POST #create" do

    before do
      course
      sign_in teacher
    end

    it 'will return unsuccessful response with invalid attributes' do
      process :create, method: :post,
              params: {:assignment => {course_id: 100}},
                :format => :json
      expect(response).to_not be_success
    end

    it 'will not create a lesson plan with invalid attributes' do
      process :create, method: :post,
              params: {:assignment => {course_id: 100}},
                :format => :json
      expect(Assignment.all).to be_empty
    end

    it 'will return error message on failed creation' do
      process :create, method: :post,
              params: {:assignment => {course_id: 100}},
                :format => :json
      body = JSON.parse(response.body)
      expect(body['errors']).to_not be_empty
    end

    it 'will return successful response with valid attributes' do
      process :create, method: :post,
              params: {:assignment => {course_id: course.id, title: "Test"} },
              :format => :json
      expect(response).to be_success
    end

    it 'will create lesson in database with valid attributes' do
      expect {
      process :create, method: :post,
              params: { :assignment => {course_id: course.id, title: "Test"} },
              :format => :json
      }.to change{Assignment.count}.by(1)
    end

  end

end
