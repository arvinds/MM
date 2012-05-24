class CreateRides < ActiveRecord::Migration
  def change
    create_table :rides do |t|
      t.integer :driver_id
      t.string :from_loc_str
      t.float :from_loc_lat
      t.float :from_loc_lon
      t.string :to_loc_str
      t.float :to_loc_lon
      t.float :to_loc_lat
      t.date :from_datetime
      t.date :to_datetime
      t.boolean :from_flexible
      t.boolean :to_flexible

      t.timestamps
    end
  end
end
