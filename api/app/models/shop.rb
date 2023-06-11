class Shop < ApplicationRecord
  has_many :bags
  has_many :staffs
end
