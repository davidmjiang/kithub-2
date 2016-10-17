require 'rails_helper'

describe KithubController do

  let(:teacher){create :teacher}


  describe 'GET #index' do
    it "renders the kithub controller html page" do
      sign_in teacher
      get :index
      expect(response).to render_template :index
    end

    it "redirects to the sign_in page" do
      get :index
      expect(response).to redirect_to teacher_session_path
    end
  end

end
