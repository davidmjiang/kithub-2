class CallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @teacher = Teacher.from_omniauth(request.env["omniauth.auth"])
    @teacher.first_name = request.env["omniauth.auth"].extra.raw_info.name.split(" ").first
    @teacher.last_name = request.env["omniauth.auth"].extra.raw_info.name.split(" ")[1..-1].join(" ")
    sign_in_and_redirect @teacher
  end
end