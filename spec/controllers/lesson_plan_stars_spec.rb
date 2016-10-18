require 'rails_helper'

describe LessonPlanStarsController, type: :controller do
  render_views

  let(:teacher){create :teacher}
  let(:lesson_plan_star){create :lesson_plan_star, teacher: teacher}
  let(:json) {JSON.parse(response.body)}


  describe 'GET #index' do


    before do
      sign_in teacher
      lesson_plan_star
      get :index, params: {teacher_id: teacher.id }, :format => :json
    end

    it "will return a succesful response" do
      expect(response).to be_success
    end

    it 'will not return nil if there are lessons in the database' do
      expect(json).to_not be nil
    end

    it 'will return all lesson contributors in the database' do
      expect(json.length).to eq 1
    end

  end

  

end
