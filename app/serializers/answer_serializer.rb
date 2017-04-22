class AnswerSerializer < ActiveModel::Serializer
	include ActionView::Helpers::DateHelper

  attributes :id, :response, :cached_votes_score, :comments_count, :created, :username

  # has_one :user, serializer: UserSerializer

  def created
    time_ago_in_words(object.created_at)
  end

  def username
    object.user.username
  end
end
