class CreateSlots < ActiveRecord::Migration
  def self.up
    create_table :slots do |t|
      t.integer :ride_slot_id
      t.integer :user_id
      t.string :from_loc_str
      t.string :to_loc_str
      t.date :from_datetime
      t.date :to_datetime
      t.boolean :from_flexible
      t.boolean :to_flexible
      t.integer :price
      t.integer :number_of_seats
      t.timestamps
    end
  end

  def self.down
    drop_table :slots
  end
end
