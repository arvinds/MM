class User < ActiveRecord::Base
	has_many :rides, :foreign_key => "driver_id"
	has_many :seats, :foreign_key => "rider_id"
	attr_accessible :user_id, :first_name, :last_name, :email
end
