
Rails.application.routes.draw do 
  
  resources :r_leg_models
  resources :l_leg_models
  resources :r_arm_models
  resources :l_arm_models
  resources :body_models
  resources :head_models
  devise_for :users, :controllers => {registrations: 'registrations'}
  resources :toys do
    resources :ratings
  end
  root to: 'pages#index'
  get 'pages/contact'
  get 'pages/about'
  get 'pages/upload_model'
  get '/toys/:id', to: "toys#displayPDF", as: :displayPDF
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
