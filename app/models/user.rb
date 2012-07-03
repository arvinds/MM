class User < ActiveRecord::Base
    acts_as_authentic do |config|
      config.validate_password_field = false
      config.require_password_confirmation = false
      config.ignore_blank_passwords = true
    end

	has_many :rides
	has_many :seats
	attr_accessible :first_name, :last_name, :email

    def name
        "#{first_name} #{last_name}"
    end


    def self.create_user(fbid,fname,lname,email)
        user = User.new()
        user.id = rand(999999)#fbid.to_i #TODO: do this right
        user.first_name = fname
        user.last_name = lname
        user.email = email
        user.save!
        return user.id
    end

end
