Rails.application.routes.draw do
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/gradebook', to: "gradebooks#index"


  root to: 'kithub#index'

end
