Rails.application.routes.draw do
	
	get 'react_index', to: 'questions#react_index'
	get '/questionpage/:id', to: 'questions#question_page'
  get 'hello_world', to: 'hello_world#index'
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }
	root to: 'questions#index'

	resources :questions do
		  # Ansers related routes
			resources :answers do
				resource :comments, module: :answers
				member do
					put "like" => "answers#upvote"
					put "dislike" => "answers#downvote"
				end
			end

			# Questions related routes
			resources :comments, module: :questions
			member do
				put "like" => "questions#upvote"
				put "dislike" => "questions#downvote"
			end
	end


end
