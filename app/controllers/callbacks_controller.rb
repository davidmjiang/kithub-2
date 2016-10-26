class CallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @teacher = Teacher.from_omniauth(request.env["omniauth.auth"])
    sign_in_and_redirect @teacher
  end
end