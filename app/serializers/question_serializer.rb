class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :detail, :cached_votes_score, :comments_count, :created_at, :answers_count, :username

  self.root = false

  def username
    object.user.username
  end
end
