require 'rails_helper'

describe PullRequestsController do

  let(:pull_request) { create :pull_request }
  let(:teacher) { create :teacher }


  describe 'GET #index' do

    before do
      pull_request
      sign_in teacher
      process :index, method: :get, params: { lesson_plan_id: pull_request.parent_plan.id }, format: :json
    end

    it "will return a succesful response" do
      expect(response).to be_success
    end

    it 'will not return nil if there are pull requests in the database' do
      data = JSON.parse(response.body)
      expect(data).to_not be_empty
    end

    it 'will return all lessons in the database' do
      data = JSON.parse(response.body)
      expect(data.length).to eq 1
    end

  end

  describe "POST create" do

    before do
      sign_in teacher
    end

    it "creates a pull requests with valid attributes" do
      expect do
        process :index, method: :get, params: { lesson_plan_id: pull_request.parent_plan.id, pull_request: { title: "Hello World!" } }, format: :json
      end.to change{PullRequest.count}.by(1)
    end

  end

end
