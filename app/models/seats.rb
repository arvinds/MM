class Seat < ActiveRecord::Base
	belongs_to :ride # the driver
	has_one :user, :foreign_key => "rider_id"
end
