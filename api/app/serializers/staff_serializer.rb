class StaffSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone_number, :role, :password
  belongs_to :shop
end
