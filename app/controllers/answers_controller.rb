class AnswersController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show]
	before_action :set_answer, only: [:show, :edit, :update, :destroy, :upvote, :downvote]
	before_action :load_upvote, only: [:upvote, :downvote]

	respond_to :html, :json

	def index
		@answers = Answer.all
	end

	def edit

	end
	def update
		respond_to do |format|
		  if @answer.update(answer_params)
		    format.html { redirect_to @answer }
		    format.json { render json: @question}
		  else
		    format.html { render :edit }
		    format.json { render json: @answer.errors, status: :unprocessable_entity }
		  end
		end
	end

	def new
	end

	def show
	end

	def destroy
		if(@answer.user_id == current_user.id)
			@answer.destroy
			respond_to do |format|
			  # format.html { redirect_to @question}
			  format.json { render result: "success!" }
			end
		end
	end

	def create
		@question = Question.find(params[:question_id])
		@answer = @question.answers.create(answer_params)
		@answer.user = current_user

		respond_to do |format|
			if @answer.save!
			  format.html { redirect_to @question, notice: 'Answer was successfully created.' }
			  format.json { redirect_to @question}
			else
			  format.html { render :new }
			  format.json { render json: @answer.errors, status: :unprocessable_entity }
			end
		end
	end

	def upvote
		@answer.liked_by current_user
		@answer.save!
		respond_to do |format|
      format.html { redirect_to :back }
      format.json { render json: @question }
		end
	end

	def downvote
		@answer.downvote_from current_user
		@answer.save!
		respond_to do |format|
      format.html { redirect_to :back }
      format.json { render json: @question }
		end
	end

	private
		def set_answer
			@answer = Answer.find(params[:id])
		end

		def load_upvote
			@question = @answer.question
		end

		def answer_params
			params.require(:answer).permit(:response, :user_id)
		end


end
