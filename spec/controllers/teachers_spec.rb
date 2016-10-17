# require 'rails_helper'

# describe TeachersController do

#   let(:teacher){create :teacher}


#   describe 'GET #show' do

#     before do
#       sign_in teacher
#       get :show, id: teacher.id, :format => :json
#     end

#     it "will return a successful response" do
#       expect(response).to be_success
#     end

#     it 'will not return nil if teacher is in the database' do
#       expect(response).to_not be nil
#     end

#     it 'will return correct attributes' do
#       expect(response.teacher).to include( :id, :email, :first_name, :last_name, :created_at, :state, :avatar_file_name, :image, :lesson_plans, :followed_by, :following, :starred_lesson_plans, :lesson_plans_contributed_to, :num_lessons, :states)
#     end

#   end

#   # describe "POST #create" do


#   #   before do
#   #     sign_in teacher
#   #   end

#   #   it 'will return unsucessful response with invalid attributes' do
#   #     process :create, method: :post,
#   #             params: {
#   #                       :lesson_plan => attributes_for(:lesson_plan,
#   #                                                      :without_title)
#   #                     }, :format => :json

#   #     expect(response).to_not be_success
#   #   end

#   #   it 'will not create a lesson plan with invalid attributes' do
#   #     process :create, method: :post,
#   #             params: {
#   #                       :lesson_plan => attributes_for(:lesson_plan,
#   #                                                      :without_title)
#   #                     }, :format => :json

#   #     expect(LessonPlan.all).to be_empty
#   #   end

#   #   it 'will return error message on failed creation' do
#   #     process :create, method: :post,
#   #             params: {
#   #                       :lesson_plan => attributes_for(:lesson_plan,
#   #                                                      :without_title)
#   #                     }, :format => :json
#   #     body = JSON.parse(response.body)

#   #     expect(body['errors']).to_not be_empty
#   #   end

#   #   it 'will return succesful response with valid attributes' do
#   #     process :create, method: :post,
#   #             params: { :lesson_plan => attributes_for(:lesson_plan) },
#   #             :format => :json

#   #     expect(response).to be_success
#   #   end

#   #   it 'will create lesson in database with valid attributes' do
#   #     expect {
#   #     process :create, method: :post,
#   #             params: { :lesson_plan => attributes_for(:lesson_plan) },
#   #             :format => :json
#   #     }.to change{LessonPlan.count}.by(1)
#   #   end

#   #   it 'will return same created object with valid attributes' do
#   #     process :create, method: :post,
#   #             params: { :lesson_plan => attributes_for(:lesson_plan,
#   #                                                     title: "Graham Rocks!") },
#   #             :format => :json

#   #     new_lesson = JSON.parse(response.body)

#   #     expect(new_lesson['title']).to eq "Graham Rocks!"
#   #   end



#   # end

# end
