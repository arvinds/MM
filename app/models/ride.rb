class Ride < ActiveRecord::Base
	has_many :seats
	has_one :user # the driver
end
