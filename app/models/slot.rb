class Slot < ActiveRecord::Base
  belongs_to :ride
  attr_accessible :ride_slot_id, :user_id, :from_loc_str, :to_loc_str, :from_datetime, :to_datetime, :from_flexible, :to_flexible, :price, :number_of_seats
end
