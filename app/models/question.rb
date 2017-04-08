class Question < ApplicationRecord
	has_many :answers, :dependent => :destroy
	belongs_to :user
	accepts_nested_attributes_for :answers

	acts_as_votable

	validates :title, presence: true
end
