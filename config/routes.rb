Rails.application.routes.draw do
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'kithub#index'

  scope :api do
  	scope :v1 do
  		resources :teachers
      resources :students
      resources :courses
      resources :comments, only: [:create]
      resources :assignments, only: [:create]
      resources :submissions, only: [:create, :index]
<<<<<<< HEAD
      resources :lesson_plans, only: [:index, :create, :show] do
        resources :pull_requests, only: [:index, :create]
=======
      resources :lesson_plans, only: [:index, :create, :show, :update] do
        resources :pull_requests, only: [:index]
>>>>>>> 7d71d41661cfd1fd0830b1381a27aea205f6774a
      end
      get "/gpas", to: "gpas_controller#index"
    end
 	end


  get '/gradebook', to: "gradebooks#index"


end
