class RemoveIdFromTables < ActiveRecord::Migration
  def up
    remove_column :seats, :seat_id
    remove_column :rides, :ride_id
    remove_column :users, :user_id
  end

  def down
  end
end
