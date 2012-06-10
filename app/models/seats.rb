class Seat < ActiveRecord::Base
	belongs_to :ride # the driver
	belongs_to :user, :foreign_key => "rider_id", :class_name => "User"
end
