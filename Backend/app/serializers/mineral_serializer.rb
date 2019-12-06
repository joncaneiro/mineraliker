class MineralSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :url, :likes
  has_many :comments
end
