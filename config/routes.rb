Rails.application.routes.draw do
	
	get 'react_index', to: 'questions#react_index'
	get '/questionpage/:id', to: 'questions#question_page'
	put '/questionspage/:id/edit', to: 'questions#update'
	put '/questions/:id/answers/:id/edit', to: 'answers#update'
	put '/comments/:id/:commentable_type/:comment_id/edit', to: 'comments#update'
	delete '/comments/:id', to: 'comments#destroy'


	delete '/questionspage/:id', to: 'questions#destroy'

  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }
	root to: 'questions#react_index'

	get 'tags', to: 'tags#index'

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
