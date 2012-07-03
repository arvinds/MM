class Ride < ActiveRecord::Base
	has_many :seats
	#has_one :user, :foreign_key => "driver_id"
	belongs_to :user, :foreign_key => "driver_id", :class_name => "User"
    attr_accessible :from_loc_str, :from_loc_lat, :from_loc_lon, :to_loc_str, :to_loc_lat, :to_loc_lon, :driver_id, :from_datetime, :to_datetime

    def self.find_best_routes(from_lat, from_lon, to_lat, to_lon)
      if Ride.all.length == 0
        return []
      end
      Ride.all.sort do |a,b| 
        delta_from_a = a.euc_dist_to_from_loc(from_lat, from_lon)
        delta_from_b = b.euc_dist_to_from_loc(from_lat, from_lon)
        delta_to_a = a.euc_dist_to_to_loc(to_lat, to_lon)
        delta_to_b = b.euc_dist_to_to_loc(to_lat, to_lon)
        (delta_from_a + delta_to_a) <=> (delta_from_b + delta_to_b)
      end
    end
    
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

    def driver=(driver)
        user = driver  
    end

    def driver
        user
    end
     
    def euc_dist_to_from_loc(p1_lat, p1_lon)
        #puts self.from_loc_lat
        #puts from_loc_lat
        #puts from_loc_str
        #puts "test"
        Math.sqrt((((p1_lat - from_loc_lat) ** 2) + ((p1_lon - from_loc_lon) ** 2)))
    end

    def euc_dist_to_to_loc(p1_lat, p1_lon)
        Math.sqrt((((p1_lat - to_loc_lat) ** 2) + ((p1_lon - to_loc_lon) ** 2)))
    end

end
