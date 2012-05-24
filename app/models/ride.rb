class Ride < ActiveRecord::Base
	has_many :seats
	has_one :user, :foreign_key => "driver_id"
end
