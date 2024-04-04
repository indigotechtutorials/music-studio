Rails.application.routes.draw do
  devise_for :users
  resources :projects do
    scope module: :projects do
      resources :drum_patterns do
        resources :file_uploads, only: [:create]
        resources :drum_pattern_tracks, only: [] do
          post "save", to: "drum_pattern_tracks#save"
        end
        post "drag", to: "drum_patterns#drag"
        
      end
      resource :save, only: [:create], controller: :save
    end
  end
  resources :drumkits, only: [:create] do
    post "upload_modal", to: "drumkits#upload_modal", on: :collection
    post "upload_file", to: "drumkits#upload_file", on: :collection
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  # Defines the root path route ("/")
  root "studio#show"
end
