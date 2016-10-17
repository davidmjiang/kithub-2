require 'rails_helper'

describe TeachersController, type: :controller do 
  render_views

  let(:json) {JSON.parse(response.body)}
  let(:teacher){create :teacher}


  describe 'GET #show' do

    before do
      sign_in teacher
      get :show, params: {id: teacher.id}, :format => :json
    end

    it "will return a successful response" do
      expect(response).to be_success
    end

    it 'will not return nil if teacher is in the database' do
      expect(response).to_not be nil
    end

    it 'will return correct attributes with teacher' do
      expect(json).to include("id")
      expect(json).to include("email")
      expect(json).to include("first_name")
      expect(json).to include("last_name")
      expect(json).to include("created_at")
      expect(json).to include("state")
      expect(json).to include("avatar_file_name")
      expect(json).to include("lesson_plans")
      expect(json).to include("followed_by")
      expect(json).to include("following")
      expect(json).to include("starred_lesson_plans")
      expect(json).to include("lesson_plans_contributed_to")
      expect(json).to include("num_lessons")
      expect(json).to include("states")
    end


  end

  describe 'PATCH #update' do

    before do
      sign_in teacher
    end

    it 'will be a success with correct params' do
      put :update,  params: {id: teacher.id, teacher: {id: teacher.id, first_name: "Alex", last_name: "Lach", state: "Massachusetts"}}, format: :json
      expect(response).to be_success
    end

    it 'will update correctly with correct params' do
      put :update,  params: {id: teacher.id, teacher: {id: teacher.id, first_name: "Alex", last_name: "Lach", state: "Massachusetts"}}, format: :json
      expect(json["first_name"]).to eq("Alex")
    end

    it 'will not update invalid params' do
      put :update,  params: {id: teacher.id, teacher: {first_name: "", not_allowed: "Lach"}}, format: :json
      expect(json["status"]).to eq(422)
    end



  end



end
