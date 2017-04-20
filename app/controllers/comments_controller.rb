class CommentsController < ApplicationController
	before_action :authenticate_user!

	respond_to :html, :json

	def index
			@comments = @comments.order(created_at: :desc)
			respond_to do |format|
			  format.json { render json: @comments }
			end

	end


	def create
		@comment = @commentable.comments.new comment_params
		@comment.user_id = current_user
		@comment.save
		redirect_to @commentable
	end

	private
		def comment_params
			params.require(:comment).permit(:body)
		end

end