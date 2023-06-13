class CreateStaffs < ActiveRecord::Migration[7.0]
  def change
    create_table :staffs do |t|
      t.string :name
      t.string :password_digest
      t.integer :phone_number
      t.string :role
      t.integer :shop_id

      t.timestamps
    end
  end
end
