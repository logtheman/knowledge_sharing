class Answer < ApplicationRecord
	belongs_to :question, counter_cache: true
	has_many :comments, as: :commentable, :dependent => :destroy, counter_cache: true
	belongs_to :user
	# has_many :votes, :dependent => :destroy 

	acts_as_votable

	attr_readonly :comments_count
	validates :response, presence: true
	validates_associated :question
end
