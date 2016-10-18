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
      resources :lesson_plans, only: [:index, :create, :show, :update] do
        resources :pull_requests, only: [:index, :create]


      end
      resources :teacher_followings, only: [:index, :create, :destroy]
      resources :lesson_plan_contributors, only: [:index, :create]
      resources :lesson_plan_stars, only: [:index, :create]
      get "/gpas", to: "gpas_controller#index"
    end
 	end


  get '/gradebook', to: "gradebooks#index"


end
