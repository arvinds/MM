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

end
