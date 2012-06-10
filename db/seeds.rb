# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alonside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def time_rand from = 0.0, to = Time.now
  Time.at(from + rand * (to.to_f - from.to_f))
end

def rand_float_in_range (min, max)
    rand * (max-min) + min
end


MIN_LAT =  36.597889
MAX_LAT = 47.040182
MIN_LON = -118.828125
MAX_LON = -93.515625


User.delete_all
u = User.create(
        :first_name => "test1", 
        :last_name => "user2", 
        :email =>"test1@user.com"
)

Ride.delete_all
400.times do |i|
    Ride.create(
        :from_loc_str => "from_place_#{i}",
        :to_loc_str => "to_place_#{i}",
        :driver_id => u.id,
        #:driver => test_user,
        :from_loc_lon => rand_float_in_range(MIN_LON, MAX_LON),
        :from_loc_lat => rand_float_in_range(MIN_LAT, MAX_LAT),
        :to_loc_lon => rand_float_in_range(MIN_LON, MAX_LON),
        :to_loc_lat => rand_float_in_range(MIN_LAT, MAX_LAT),
        :from_datetime => time_rand,
        :to_datetime => time_rand
    )
end

