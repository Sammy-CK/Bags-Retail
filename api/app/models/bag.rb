class Bag < ApplicationRecord
  belongs_to :shop
  belongs_to :category
  include ImageUploader::Attachment(:image)
end
