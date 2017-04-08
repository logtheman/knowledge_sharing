class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :answers, :dependent => :destroy
  has_many :questions, :dependent => :destroy
  # for voting gem
  acts_as_voter

  validates :username, length: {in: 3..15}, uniqueness: true
  validates :email, uniqueness: true
end
