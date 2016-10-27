Rails.application.routes.draw do

  devise_for :teachers, :controllers => { omniauth_callbacks: "callbacks" }

  devise_scope :teacher do
    unauthenticated do
      root 'devise/registrations#new'
    end
  end


  root to: 'kithub#index'

  scope :api do
  	scope :v1 do
  		resources :teachers do 
        resources :contributions, only: [:index]
      end
      resources :students
      resources :courses
      resources :searches, only: [:index]
      resources :comments, only: [:create, :destroy]
      resources :assignments, only: [:create, :update, :destroy]
      resources :submissions, only: [:create, :index, :update]
      resources :lesson_plans, only: [:index, :create, :show, :update, :destroy] do
        resources :pull_requests, only: [:index, :create, :update]
        resources :additional_materials, only: [:index, :create]
        resources :lesson_plan_stars, only: [:create, :destroy]
        get "/export", to: "lesson_plans#export"
      end
      resources :flat_curves, only: [:create, :update, :destroy]
      resources :linear_curves, only: [:create, :update, :destroy]
      resources :additional_materials, only: [:destroy]
      resources :teacher_followings, only: [:index, :create, :destroy]
      resources :lesson_plan_contributors, only: [:index, :create]
      resources :lesson_plan_stars, only: [:index]
      resources :lesson_plan_days, only: [:create, :destroy]


      post "student_progress/fail/", to: "student_progress#fail"
      post "student_progress/exceptional/", to: "student_progress#exceptional"
      post "student_progress/fail_assignment/", to: "student_progress#fail_assignment"
      post "student_progress/exceptional_assignment/", to: "student_progress#exceptional_assignment"

      get "/gpas", to: "gpas_controller#index"
    end
 	end

  get '/gradebook', to: "gradebooks#index"
  get '/syllabi', to: 'syllabi#index'


end
