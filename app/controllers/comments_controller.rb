class CommentsController < ApplicationController
	before_action :authenticate_user!

	respond_to :html, :json

	def index
			@comments = @comments.order(created_at: :desc)
			respond_to do |format|
			  format.json { render json: @comments, include: [:user] }
			end

	end


	def create

		# redirect_to @commentable
	end

	private
		def comment_params
			params.require(:comment).permit(:body, :user_id)
		end

end