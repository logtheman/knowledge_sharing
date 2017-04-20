class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :username, :created_at

  def username
    object.user.username
  end
end
