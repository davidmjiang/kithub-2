Rails.application.routes.draw do
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'kithub#index'

  scope :api do
  	scope :v1 do
  		resources :teachers
      resources :students
      resources :courses
      resources :comments, only: [:create, :destroy]
      resources :assignments, only: [:create, :update]
      resources :submissions, only: [:create, :index, :update]
      resources :lesson_plans, only: [:index, :create, :show, :update, :destroy] do
        resources :pull_requests, only: [:index, :create, :update]
        resources :additional_materials, only: [:index, :create]
        resources :lesson_plan_stars, only: [:create, :destroy]
      end
      resources :flat_curves, only: [:create, :update, :destroy]
      resources :linear_curves, only: [:create, :update, :destroy]
      resources :additional_materials, only: [:destroy]
      resources :teacher_followings, only: [:index, :create, :destroy]
      resources :lesson_plan_contributors, only: [:index, :create]
      resources :lesson_plan_stars, only: [:index]
      get "/gpas", to: "gpas_controller#index"
    end
 	end

  get '/gradebook', to: "gradebooks#index"


end
