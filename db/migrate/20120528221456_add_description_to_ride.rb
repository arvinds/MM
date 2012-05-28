class AddDescriptionToRide < ActiveRecord::Migration
  def change
    add_column :rides, :description, :string

  end
end
