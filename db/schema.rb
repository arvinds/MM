# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120503023002) do

  create_table "rides", :force => true do |t|
    t.integer  "ride_id"
    t.integer  "driver_id"
    t.string   "from_loc_str"
    t.float    "from_loc_lat"
    t.float    "from_loc_lon"
    t.string   "to_loc_str"
    t.float    "to_loc_lon"
    t.float    "to_loc_lat"
    t.date     "from_datetime"
    t.date     "to_datetime"
    t.boolean  "from_flexible"
    t.boolean  "to_flexible"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "seats", :force => true do |t|
    t.integer  "seat_id"
    t.integer  "ride_id"
    t.integer  "rider_id"
    t.integer  "status"
    t.string   "first_name"
    t.integer  "price"
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.integer  "user_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
