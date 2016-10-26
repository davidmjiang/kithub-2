class CallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @teacher = Teacher.from_omniauth(request.env["omniauth.auth"])
    @teacher.first_name = request.env["omniauth.auth"].extra.raw_info.name
    sign_in_and_redirect @teacher
  end
end