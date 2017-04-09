class QuestionsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show]
	before_action :set_question, only: [:show, :edit, :update, :destroy, :upvote, :downvote]


	def index
		@questions = Question.all
	end	

	def new
		@question = Question.new
	end

	def show
	end

	def edit
	end

	def destroy
		@question.destroy
		respond_to do |format|
		  format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
		  format.json { head :no_content }
		end
	end

	def create
		@question = Question.new(question_params)
		@question.user_id = current_user.id
		respond_to do |format|
			if @question.save!
			  format.html { redirect_to @question, notice: 'Post was successfully created.' }
			  format.json { render :show, status: :created, location: @question }
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
		redirect_to questions_path
	end

	def downvote
		@question.downvote_from current_user
		redirect_to questions_path
	end


	private
		def set_question
			@question = Question.find(params[:id])
		end

		def question_params
			params.require(:question).permit(:title, :detail)
		end

end
