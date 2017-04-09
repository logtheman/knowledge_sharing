class Question < ApplicationRecord
	has_many :answers, :dependent => :destroy
	has_many :comments, as: :commentable, :dependent => :destroy, counter_cache: true
	belongs_to :user
	accepts_nested_attributes_for :answers

	acts_as_votable
	attr_readonly :comments_count
	validates :title, presence: true
end
