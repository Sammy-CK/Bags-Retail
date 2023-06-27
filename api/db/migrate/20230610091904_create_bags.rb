class CreateBags < ActiveRecord::Migration[7.0]
  def change
    create_table :bags do |t|
      t.string :name
      t.boolean :sold
      t.boolean :stored
      t.integer :shop_id
      t.integer :category_id
      t.text :image_data
      t.integer :price
      t.string :sold_at
      t.integer :secret_shop_key

      t.timestamps
    end
  end
end
