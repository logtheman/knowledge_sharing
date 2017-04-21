class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, 
         :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, :omniauth_providers => [:google_oauth2]

  has_many :answers
  has_many :questions
  has_many :comments

  # for voting gem
  acts_as_voter

  validates :username, length: {in: 3..15}, uniqueness: true
  validates :email, uniqueness: true




  def self.from_omniauth(access_token)
      data = access_token.info
      user = User.where(:email => data["email"]).first

      # Uncomment the section below if you want users to be created if they don't exist
      unless user
          # Strip out the username form email
          user = User.create(username: data["email"].split("@")[0],
             first_name: data["name"].split(" ")[0],
             last_name: data["name"].split(" ")[0],
             email: data["email"],
             password: Devise.friendly_token[0,20]
          )
      end
      user
  end
end
