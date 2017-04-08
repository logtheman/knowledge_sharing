Rails.application.routes.draw do
	
  devise_for :users
	root to: 'questions#index'

	resources :questions do
			resources :answers do
				member do
					put "like" => "answers#upvote"
					put "dislike" => "answers#downvote"
				end
			end
	end
	# resources :answers do
	# 	member do
	# 		put "like" => "answers#upvote"
	# 		put "dislike" => "answers#downvote"
	# 	end
	# end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
