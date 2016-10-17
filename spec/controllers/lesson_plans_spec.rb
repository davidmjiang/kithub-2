require 'rails_helper'

describe LessonPlansController do

  let(:teacher){create :teacher}


  describe 'GET #index' do

    let!(:lesson_plan){create :lesson_plan}

    before do
      sign_in teacher
      get :index, :format => :json
    end

    it "will return a succesful response" do
      expect(response).to be_success
    end

    it 'will not return nil if there are lessons in the database' do
      data = JSON.parse(response.body)
      expect(data).to_not be nil
    end

    it 'will return all lessons in the database' do
      data = JSON.parse(response.body)
      expect(data.length).to eq 1
    end

  end

  describe "POST #create" do


    before do
      sign_in teacher
    end

    it 'will return unsucessful response with invalid attributes' do
      process :create, method: :post,
              params: {
                        :lesson_plan => attributes_for(:lesson_plan,
                                                       :without_title)
                      }, :format => :json

      expect(response).to_not be_success
    end

    it 'will not create a lesson plan with invalid attributes' do
      process :create, method: :post,
              params: {
                        :lesson_plan => attributes_for(:lesson_plan,
                                                       :without_title)
                      }, :format => :json

      expect(LessonPlan.all).to be_empty
    end

    it 'will return error message on failed creation' do
      process :create, method: :post,
              params: {
                        :lesson_plan => attributes_for(:lesson_plan,
                                                       :without_title)
                      }, :format => :json
      body = JSON.parse(response.body)

      expect(body['errors']).to_not be_empty
    end

    it 'will return succesful response with valid attributes' do
      process :create, method: :post,
              params: { :lesson_plan => attributes_for(:lesson_plan) },
              :format => :json

      expect(response).to be_success
    end

    it 'will create lesson in database with valid attributes' do
      expect {
      process :create, method: :post,
              params: { :lesson_plan => attributes_for(:lesson_plan) },
              :format => :json
      }.to change{LessonPlan.count}.by(1)
    end

    it 'will return same created object with valid attributes' do
      process :create, method: :post,
              params: { :lesson_plan => attributes_for(:lesson_plan,
                                                      title: "Graham Rocks!") },
              :format => :json

      new_lesson = JSON.parse(response.body)

      expect(new_lesson['title']).to eq "Graham Rocks!"
    end

  end

  describe 'GET #index' do

    let!(:lesson_plan){create :lesson_plan}

    before do
      sign_in teacher
    end

    it "will return a succesful response if lesson exists" do
      process :show, method: :get, params: {id: lesson_plan.id}, :format => :json
      expect(response).to be_success
    end

    it 'will return the specific lesson from the database' do
      process :show, method: :get, params: {id: lesson_plan.id}, :format => :json
      data = JSON.parse(response.body)
      expect(data['id']).to eq lesson_plan.id
    end

    it 'will raise error if lesson is not in the database' do
      expect do
        process :show, method: :get, params: {id: 0}, :format => :json
      end.to raise_error(ActiveRecord::RecordNotFound)
    end

  end

end
