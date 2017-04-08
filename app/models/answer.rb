class Answer < ApplicationRecord
	belongs_to :question, counter_cache: true
	belongs_to :user
	has_many :votes, :dependent => :destroy 

	acts_as_votable


	validates :response, presence: true
	validates_associated :question
end
