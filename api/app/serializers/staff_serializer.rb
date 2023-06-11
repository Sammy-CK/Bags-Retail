class StaffSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone_number, :role
  belongs_to :shop
end
