class QuestionsController < ApplicationController
	include ActionView::Helpers::TextHelper
	before_action :authenticate_user!, except: [:index, :react_index, :show]
	before_action :set_question, only: [:show, :question_page, :edit, :update, :destroy, :upvote, :downvote]

	respond_to :html, :json

	def index
		@questions = Question.all
	end	

	def react_index
		@questions = Question.all

		@questions= @questions.order("cached_votes_score desc") # default sort

		if params[:sort_by] == 'date_newest'
		  @questions = @questions.order(created_at: :desc)
		end
		if params[:sort_by] == 'date_oldest'
		  @questions = @questions.order(created_at: :asc)
		end
		# if params[:tag]
		#   @questions = Post.tagged_with(params[:tag])
		# end
		if params[:sort_by] == 'most_comments'
		  @questions= @questions.order("comments_count desc")
		end
		if params[:sort_by] == 'most_answers'
		  @questions= @questions.order("answers_count desc")
		end
		if params[:sort_by] == 'most_voted'
		  @questions= @questions.order("cached_votes_score desc")
		end
		if params[:sort_by] == 'most_views'
		  @questions = @question.order("views_count desc")
		end


		
		# scope :sort_by_newest, -> { order(created_at: :desc) }
		respond_to do |format|
		  format.html do
		    render component: 'QuestionsIndex', props: {
		      questions: prepareArray(@questions),
		      user:      current_user && prepare(current_user)
		    }, tag: 'div'
		  end
		  format.json { render json: @questions }
		end

	end	

	def new
		@question = Question.new
	end

	def question_page

	end

	def show
		answers = @question.answers;
		answers = answers.order(cached_votes_score: :desc)
		comments = @question.comments;
		@question.increment(:views_count, 1)
		@question.save!

		respond_to do |format|
		  format.html do
		    render component: 'QuestionPage', props: {
		      question:  prepare(@question),
		      answers:   prepareArray(answers),
		      comments:   prepareArray(comments),
		      user:      current_user && prepare(current_user)
		    }, tag: 'div'
		  end
		  format.json { 
		  	render :json => {
		  		question: prepare(@question),
		  		comments: prepareArray(comments),
		  		answers: prepareArray(answers)
		  	}
		  }
		end

	end

	def edit
	end

	def destroy
		if(@question.user_id == current_user.id)
			@comments = @question.comments
			@comments.delete_all
			@question.destroy

			respond_to do |format|
			  format.html { redirect_to react_index_path }
			  format.json { render result: "success!" }
			end
		end
	end

	def create
		@question = Question.new(question_params)
		@question.user_id = current_user.id
		respond_to do |format|
			if @question.save!
			  format.html { redirect_to @question }
			  format.json { render result: "success!"}
			else
			  format.html { render :new }
			  format.json { render json: @question.errors, status: :unprocessable_entity }
			end
		end
	end


	def update
	  respond_to do |format|
	    if @question.update(question_params)
	      format.html { redirect_to @question }
	      format.json { render result: "success!"}
	    else
	      format.html { render :edit }
	      format.json { render json: @question.errors, status: :unprocessable_entity }
	    end
	  end
	end

	def upvote
		@question.liked_by current_user
		@question.save!
		respond_to do |format|
      format.html { redirect_to :back }
      format.json { render result: "success!" }
		end
	end

	def downvote
		@question.downvote_from current_user
		@question.save!
		respond_to do |format|
      format.html { redirect_to :back }
      format.json { render result: "success!" }
		end
	end


	private
		def set_question
			@question = Question.find(params[:id])
		end

		def prepareArray(array)
      ActiveModel::ArraySerializer.new(array, each_serializer: serializer(array))
		end

		def prepare(resource)
		  serializer(resource).new(resource)
		end

		def serializer(resource)
		  if resource.respond_to? :name
		    "#{resource.name}Serializer".safe_constantize
		  else
		    "#{resource.class}Serializer".safe_constantize
		  end
		end

		def question_params
			params.require(:question).permit(:title, :detail)
		end

end
