class Ride < ActiveRecord::Base
	has_many :seats
	has_one :user, :foreign_key => "driver_id"

    
    def self.closest_from(from_lat, from_lon)
        #TODO: use scope instead
        Ride.all.sort do |a,b| 
            #euc_dist(from_lat, from_lon, a.from_lat, a.from_lon) <=> euc_dist(from_lat, from_lon, b.from_lat, b.from_lon)
            3 <=> 3
        end
=begin
        @rides = Rides.find(:all, :order =>  ,:limit =>10)
        @from_lat = params[:from_lat]
        @from_lng = params[:from_lng]
        @to_lat = params[:to_lat]
        @to_lng = params[:to_lng]
=end
    end

    def euc_dist(p1_lat, p1_lon, p2_lat, p2_lon)
        Math.sqrt((((p1_lat - p2_lat) ** 2) + ((p1_lon - p2_lon) ** 2)))
    end
end
