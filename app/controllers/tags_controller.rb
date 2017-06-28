class TagsController < ApplicationController
	def index
		@tags = ActsAsTaggableOn::Tag.all
		render json: @tags
	end 

	def create
	end

	def show
	end

	def edit
	end

	def update
	end

	def destroy
	end

	def delete
	end


end
