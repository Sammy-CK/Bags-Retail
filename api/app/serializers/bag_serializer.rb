class BagSerializer < ActiveModel::Serializer
  attributes :id, :name, :sold, :stored, :image_url, :price, :sold_at
  belongs_to :shop
  belongs_to :category

  def image_url
    object.image_url
  end
end
