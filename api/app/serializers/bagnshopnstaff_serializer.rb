class BagnshopnstaffSerializer < ActiveModel::Serializer
    attributes :id, :name
    has_many :staffs

  end