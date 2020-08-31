# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
admin=User.new({ username: "HawkEye865", email: 'u17012806@tuks.co.za',
    password: 'R3d3mption'})

admin.toggle!(:admin)

if admin.valid?
admin.save()

elsif admin.errors.any?
admin.errors.full_messages.each do |msg|
puts msg
end
else
puts "****NOT VALID****"
end

admin=User.new({ username: "TickleRick", email: 'u18112405@tuks.co.za',
    password: 'ASmith25'})

admin.toggle!(:admin)

if admin.valid?
admin.save()

elsif admin.errors.any?
admin.errors.full_messages.each do |msg|
puts msg
end
else
puts "****NOT VALID****"
end

admin=User.new({ username: "SemiRelic", email: 'u1711796@tuks.co.za',
    password: '3st13nn3'})

admin.toggle!(:admin)

if admin.valid?
admin.save()

elsif admin.errors.any?
admin.errors.full_messages.each do |msg|
puts msg
end
else
puts "****NOT VALID****"
end

admin=User.new({ username: "PugLife", email: 'u18113941@tuks.co.za',
    password: 'Duplessis1!'})

admin.toggle!(:admin)

if admin.valid?
admin.save()

elsif admin.errors.any?
admin.errors.full_messages.each do |msg|
puts msg
end
else
puts "****NOT VALID****"
end