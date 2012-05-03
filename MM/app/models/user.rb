class User < ActiveRecord::Base
  attr_accessible :user_id, :first_name, :last_name, :email
end
