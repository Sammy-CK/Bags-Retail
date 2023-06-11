class StaffSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone_number
  belongs_to :shop
end
