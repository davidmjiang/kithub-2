require 'rails_helper'

describe StudentsController do

  let(:teacher){create :teacher}

  describe "POST #create" do

    before do
      sign_in teacher
    end

    it 'will return successful response with valid attributes' do
      process :create, method: :post,
              params: { :student => attributes_for(:student) },
              :format => :json
      expect(response).to be_success
    end

    it 'will create lesson in database with valid attributes' do
      expect {
      process :create, method: :post,
              params: { :student => attributes_for(:student) },
              :format => :json
      }.to change{Student.count}.by(1)
    end

  end

end