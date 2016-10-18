require 'rails_helper'

describe TeacherFollowingsController, type: :controller do
	render_views

	let!(:teacher){create :teacher}
	let!(:teacher2){create :teacher}
	let!(:teacher_following){create :teacher_following, follower: teacher, followed: teacher2}
	let(:json) {JSON.parse(response.body)}

	describe 'GET #index' do
		before do
			sign_in teacher
			get :index, params: {follower_id: teacher.id}, :format => :json 
		end

    it "will return a succesful response" do
      expect(response).to be_success
    end

    it 'will not return nil if there are followings in the database' do
      expect(json).to_not be nil
    end

    it "will include the right number of followers" do
    	expect(json["teachers"].length).to eq(1)
    end

    it 'will include the right keys' do
      expect(json).to include("teachers")
      expect(json).to include("followings")
    end

	end
end