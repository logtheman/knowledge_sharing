class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :response, :cached_votes_score, :comments_count, :created_at, :username

  # has_one :user, serializer: UserSerializer

  def username
    object.user.username
  end
end
