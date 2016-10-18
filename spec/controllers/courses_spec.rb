require 'rails_helper'

describe CoursesController do

  let(:teacher){create :teacher}

  describe 'GET #index' do

    let!(:course){create :course}

    before do
      sign_in teacher
      teacher.courses << course
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

    it 'will return unsuccessful response with invalid attributes' do
      process :create, method: :post,
              params: {:course => attributes_for(:course, :without_title)},
                :format => :json
      expect(response).to_not be_success
    end

    it 'will not create a lesson plan with invalid attributes' do
      process :create, method: :post,
              params: {:course => attributes_for(:course, :without_title)},
                :format => :json
      expect(Course.all).to be_empty
    end

    it 'will return error message on failed creation' do
      process :create, method: :post,
              params: {:course => attributes_for(:course, :without_title)},
                :format => :json
      body = JSON.parse(response.body)
      expect(body['errors']).to_not be_empty
    end

    it 'will return successful response with valid attributes' do
      process :create, method: :post,
              params: { :course => attributes_for(:course) },
              :format => :json
      expect(response).to be_success
    end

    it 'will create lesson in database with valid attributes' do
      expect {
      process :create, method: :post,
              params: { :course => attributes_for(:course) },
              :format => :json
      }.to change{Course.count}.by(1)
    end

  end

  describe "DELETE #destroy" do 

    let!(:course){create(:course)}
    let!(:teacher){create(:teacher)}
    let!(:other_teacher){create(:teacher)}

    it "destroys a course given a signed-in teacher's course has that course's ID" do 
      sign_in teacher
      teacher.courses << course
      expect {
        process :destroy, method: :delete, 
                :params => { :id => course.id },
                :format => :json
      }.to change{Course.count}.by(-1)
    end

    it "doesn't destroy courses belonging to other teachers" do 
      sign_in other_teacher
      teacher.courses << course 
      expect {
        process :destroy, method: :delete, 
                :params => { :id => course.id },
                :format => :json
      }.to change{Course.count}.by(0)
    end

  end

end