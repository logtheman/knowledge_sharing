class QuestionSerializer < ActiveModel::Serializer
	include ActionView::Helpers::DateHelper
	
  attributes :id, :title, :detail, :cached_votes_score, :comments_count, :created, :answers_count, :username

  self.root = false

  def created
    time_ago_in_words(object.created_at)
  end

  def username
    object.user.username
  end
end
