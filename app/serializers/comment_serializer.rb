class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :username


  # has_one :user, serializer: UserSerializer

  def username
    object.user.username
  end
end
