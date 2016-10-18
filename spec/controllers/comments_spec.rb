require 'rails_helper'

describe CommentsController do

  let(:pull_request) { create :pull_request }
  let(:lesson_plan) { create :lesson_plan }
  let(:teacher) { create :teacher }


  describe 'GET #index' do

    # before do
    #   lesson_plan
    #   sign_in teacher
    #   process :index, method: :get, params: { lesson_plan_id: lesson_plan.id }, format: :json
    # end

    # it "will return a succesful response" do
    #   expect(response).to be_success
    # end

    # it 'will not return nil if there are lessons in the database' do
    #   puts "HERE"
    #   puts response.body
    #   data = JSON.parse(response.body)
    #   expect(data).to_not be nil
    # end

    # it 'will return all lessons in the database' do
    #   data = JSON.parse(response.body)
    #   expect(data.length).to eq 1
    # end

  end

end
