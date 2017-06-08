class Question < ApplicationRecord
	has_many :answers, :dependent => :destroy
	has_many :comments, as: :commentable
	belongs_to :user
	# accepts_nested_attributes_for :answers, :allow_destroy => true
	# accepts_nested_attributes_for :comments, :allow_destroy => true

	acts_as_votable
	acts_as_taggable
	
	attr_readonly :comments_count
	validates :title, presence: true
end
