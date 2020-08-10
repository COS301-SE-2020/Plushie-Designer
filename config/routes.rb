
Rails.application.routes.draw do 
  
  devise_for :users, :controllers => {registrations: 'registrations'}
  resources :toys do
    resources :ratings
  end
  root to: 'pages#index'
  get 'pages/contact'
  get 'pages/about'
  get 'pages/myToys'
  get '/toys/:id', to: "toys#displayPDF", as: :displayPDF
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
