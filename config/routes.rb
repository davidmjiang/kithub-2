Rails.application.routes.draw do
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'kithub#index'

  scope :api do
  	scope :v1 do
  		resources :teachers
      resources :students
      resources :courses
      resources :assignments, only: [:create]
      resources :submissions, only: [:create]
      resources :lesson_plans, only: [:index, :create] do
        resources :pull_requests, only: [:index]
      end
    end
 	end


  get '/gradebook', to: "gradebooks#index"

end
