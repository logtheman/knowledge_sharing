Rails.application.routes.draw do
	
  devise_for :users
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
