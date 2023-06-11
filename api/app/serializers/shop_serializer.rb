class ShopSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :bags
  has_many :staffs
end
