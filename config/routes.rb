Rails.application.routes.draw do
  root 'home#index'
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
        registrations: 'users/registrations',
        sessions: 'users/sessions'
      }
      devise_scope :user do
        post '/users/sign_out', to: 'users/sessions#destroy'
      end
      namespace :users do
        post :referrals, to: 'referrals#create'
      end
    end
  end
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
  