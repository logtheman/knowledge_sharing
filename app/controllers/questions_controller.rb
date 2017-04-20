class QuestionsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :react_index, :show]
	before_action :set_question, only: [:show, :question_page, :edit, :update, :destroy, :upvote, :downvote]

	respond_to :html, :json

	def index
		@questions = Question.all
	end	

	def react_index
		@questions = Question.all
		@questions = @questions.order(created_at: :desc)
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
		answers = @question.answers;
		respond_to do |format|
		  format.html do
		    render component: 'QuestionPage', props: {
		      question:  prepare(@question),
		      answers:   prepareArray(answers),
		      user:      current_user && prepare(current_user)
		    }, tag: 'div'
		  end
		  format.json { render json: @question }
		end

	end

	def show

	end

	def edit
	end

	def destroy
		@question.destroy
		respond_to do |format|
		  format.html { redirect_to react_index_path, notice: 'Post was successfully destroyed.' }
		  format.json { head :no_content }
		end
	end

	def create
		@question = Question.new(question_params)
		@question.user_id = current_user.id
		respond_to do |format|
			if @question.save!
			  format.html { redirect_to @question, notice: 'Post was successfully created.' }
			  format.json { redirect_to react_index_path, notice: 'Post was successfully created.'}
			else
			  format.html { render :new }
			  format.json { render json: @question.errors, status: :unprocessable_entity }
			end
		end
	end


	def update
	  respond_to do |format|
	    if @question.update(question_params)
	      format.html { redirect_to @question, notice: 'Post was successfully updated.' }
	      format.json { render :show, status: :ok, location: @question }
	    else
	      format.html { render :edit }
	      format.json { render json: @question.errors, status: :unprocessable_entity }
	    end
	  end
	end

	def upvote
		@question.liked_by current_user
		# redirect_to questions_path
	end

	def downvote
		@question.downvote_from current_user
		# redirect_to questions_path
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
