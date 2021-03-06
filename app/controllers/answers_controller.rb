class AnswersController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show]
	before_action :set_answer, only: [:show, :edit, :update, :destroy, :upvote, :downvote]
	before_action :load_upvote, only: [:upvote, :downvote]

	def index
		@answers = Answer.all
	end

	def new
	end

	def show
	end

	def destroy

	end

	def create
		@question = Question.find(params[:question_id])
		@answer = @question.answers.create(answer_params)
		@answer.user_id = current_user.id
		@answer.save!
		redirect_to question_path(@question)

	end

	def upvote
		@answer.liked_by current_user
		redirect_to question_path(@question)
	end

	def downvote
		@answer.downvote_from current_user
		redirect_to question_path(@question)
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
