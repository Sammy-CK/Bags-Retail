class CreateBags < ActiveRecord::Migration[7.0]
  def change
    create_table :bags do |t|
      t.string :name
      t.boolean :sold
      t.boolean :stored
      t.belongs_to :shop, null: false, foreign_key: true
      t.belongs_to :category, null: false, foreign_key: true
      t.text :image_data
      t.integer :price
      t.date :sold_at

      t.timestamps
    end
  end
end
