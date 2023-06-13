# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "start"
Shop.create!(name: "Shop 1")
Staff.create!( name:'test', password:'password' , phone_number:0700000000, role:'admin', shop_id: 1 )
category.create!(name: "travel")
puts "end"