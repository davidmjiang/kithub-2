Rails.application.routes.draw do
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "kithub#index"
  get '/gradebook', to: "gradebooks#index"



end
