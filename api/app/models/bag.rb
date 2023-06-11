class Bag < ApplicationRecord
  belongs_to :shop
  belongs_to :category
  include ImageUploader::Attachment(:image)
  validates :title, presence: true
end
