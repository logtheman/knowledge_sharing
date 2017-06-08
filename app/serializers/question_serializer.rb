class QuestionSerializer < ActiveModel::Serializer
	include ActionView::Helpers::DateHelper
	
  attributes :id, :title, :detail, :cached_votes_score, :comments_count, :created, :answers_count, :views_count, :username, :tag_list
  # :tag_list

  self.root = false

  def created
    time_ago_in_words(object.created_at)
  end

  def username
    object.user.username
  end

  def tags
    object.tag_list
  end
end
