# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "start"
# Shop.create!(name:"Shop 1")
# Shop.create!(name:"Shop 2")
# Shop.create!(name:"Shop 3")
# Shop.create!(name:"Shop 4")

Staff.create!( name:'William Mbuva', password:'WM4321.' , phone_number:0792136891, role:'admin', shop_id: 1 )
# Staff.create!( name:'test1', password:'password' , phone_number:0710000000, role:'attendant', shop_id: 2 )
# Staff.create!( name:'test2', password:'password' , phone_number:0720000000, role:'attendant', shop_id: 3 )
# Staff.create!( name:'test3', password:'password' , phone_number:0730000000, role:'attendant', shop_id: 4 )


# Category.create!(name:"travel")
# Category.create!(name:"backpack")
# Category.create!(name:"sling")
# Category.create!(name:"fannypack")

# Bag.create!( name:"Gucci", sold:false, stored:true, shop_id:1, category_id:1, image:File.new("#{Rails.root}/app/assets/images/bag1travel.jpg") , price:0, sold_at:nil, secret_shop_key: 1)
# Bag.create!( name:"Coco", sold:false, stored:true, shop_id:1, category_id:2, image:File.new("#{Rails.root}/app/assets/images/bag2backpack.jpg") , price:0, sold_at:nil, secret_shop_key: 1)
# Bag.create!( name:"Channel", sold:false, stored:true, shop_id:1, category_id:3, image:File.new("#{Rails.root}/app/assets/images/bag3sling.jpg") , price:0, sold_at:nil, secret_shop_key: 1)
# Bag.create!( name:"Loui Viton", sold:false, stored:true, shop_id:1, category_id:4, image:File.new("#{Rails.root}/app/assets/images/bag4fannypack.jpg") , price:0, sold_at:nil, secret_shop_key: 1)




puts "end"