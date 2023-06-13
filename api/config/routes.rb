Rails.application.routes.draw do
  resources :bags
  resources :categories
  resources :staffs
  resources :shops
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    #Route for Logging in an existing user
    post '/login', to: 'auth#create'


end
