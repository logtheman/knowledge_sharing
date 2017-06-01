class CommentsController < ApplicationController
	before_action :authenticate_user!
	before_action :set_comment, except: [:create]

	respond_to :html, :json

	def index
			@comments = @comments.order(created_at: :desc)
			respond_to do |format|
			  format.json { render json: @comments, include: [:user] }
			end

	end

	def edit
	end

	def update
	  # @commentable = Question.find(params[:question_id])
	  respond_to do |format|
	    if @comment.update(comment_params)
	      format.html { redirect_to @commentable }
	      format.json { render json: @commentable}
	    else
	      format.html { render :edit }
	      format.json { render json: @commentable.errors, status: :unprocessable_entity }
	    end
	  end
	end

	def destroy
	  if(@comment.user_id == current_user.id)
	    @comment.destroy
	    respond_to do |format|
	      format.html { render result: "success!"}
	      format.json { render result: "success!" }
	    end
	  end
	end

	def create
		@comment = @commentable.comments.new comment_params
		@comment.user = current_user
		@comment.save

		# redirect_to @commentable
	end

	private
	def set_comment
	  @comment = Comment.find(params[:id])
	  
	end

		def comment_params
			params.require(:comment).permit(:body, :user_id)
		end

end