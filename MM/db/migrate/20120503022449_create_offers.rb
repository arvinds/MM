class CreateOffers < ActiveRecord::Migration
  def self.up
    create_table :offers do |t|
      t.integer :ride_slot_id
      t.integer :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :offers
  end
end
