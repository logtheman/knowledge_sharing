class Questions::CommentsController < CommentsController
  before_action :set_commentable

  respond_to :html, :json

  def create
  	@comment = @commentable.comments.new(comment_params)
  	@comment.user = current_user

  	respond_to do |format|
  		if @comment.save!
  		  format.html { redirect_to @commentable, notice: 'Post was successfully created.' }
  		  format.json { redirect_to @commentable, notice: @comment.user_id}
  		else
  		  format.html { render :new }
  		  format.json { render json: @commentable.errors, status: :unprocessable_entity }
  		end
  	end

  end

  def destroy
    if(@comment.user_id == current_user.id)
      @comment.destroy
      respond_to do |format|
        # format.html { redirect_to @question}
        format.json { render result: "success!" }
      end
    end
  end


  private
  	def comment_params
  		params.require(:comment).permit(:body, :user_id)
  	end

    def set_commentable
      @commentable = Question.find(params[:question_id])
    end
end