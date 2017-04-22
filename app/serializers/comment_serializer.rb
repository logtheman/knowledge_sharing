class CommentSerializer < ActiveModel::Serializer
	include ActionView::Helpers::DateHelper

  attributes :id, :body, :created, :username


  def created
    time_ago_in_words(object.created_at)
  end

  def username
    object.user.username
  end
end
