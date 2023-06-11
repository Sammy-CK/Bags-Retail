Rails.application.routes.draw do
  resources :bags
  resources :admins
  resources :categories
  resources :staffs
  resources :shops
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
