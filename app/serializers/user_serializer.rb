class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  self.root = false
  
end
