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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_01_14_151307) do

  create_table "car_categories", force: :cascade do |t|
    t.string "name"
    t.string "short_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "car_divisions", force: :cascade do |t|
    t.string "name"
    t.string "short_name"
    t.integer "car_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_category_id"], name: "index_car_divisions_on_car_category_id"
  end

  create_table "cars", force: :cascade do |t|
    t.string "name"
    t.string "brand"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "circuit_variants", force: :cascade do |t|
    t.string "name"
    t.integer "length"
    t.integer "circuit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["circuit_id"], name: "index_circuit_variants_on_circuit_id"
  end

  create_table "circuits", force: :cascade do |t|
    t.string "name"
    t.integer "city_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_circuits_on_city_id"
  end

  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "drivers", force: :cascade do |t|
    t.string "name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "race_participant_track_activities", force: :cascade do |t|
    t.string "state"
    t.integer "laps_count"
    t.integer "total_time"
    t.integer "track_activity_id"
    t.integer "race_participant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["race_participant_id"], name: "index_race_participant_track_activities_on_race_participant_id"
    t.index ["track_activity_id"], name: "index_race_participant_track_activities_on_track_activity_id"
  end

  create_table "race_participants", force: :cascade do |t|
    t.integer "car_number"
    t.integer "team_id"
    t.integer "car_id"
    t.integer "driver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_race_participants_on_car_id"
    t.index ["driver_id"], name: "index_race_participants_on_driver_id"
    t.index ["team_id"], name: "index_race_participants_on_team_id"
  end

  create_table "race_weekends", force: :cascade do |t|
    t.string "name"
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer "race_number"
    t.integer "car_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_category_id"], name: "index_race_weekends_on_car_category_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "track_activities", force: :cascade do |t|
    t.string "name"
    t.string "short_name"
    t.string "date"
    t.integer "duration"
    t.integer "laps"
    t.string "state"
    t.string "type"
    t.integer "car_division_id"
    t.integer "circuit_variant_id"
    t.integer "race_weekend_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_division_id"], name: "index_track_activities_on_car_division_id"
    t.index ["circuit_variant_id"], name: "index_track_activities_on_circuit_variant_id"
    t.index ["race_weekend_id"], name: "index_track_activities_on_race_weekend_id"
  end

  create_table "track_laps", force: :cascade do |t|
    t.boolean "partial_lap"
    t.integer "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "track_partial_laps", force: :cascade do |t|
    t.integer "time"
    t.integer "sector"
    t.integer "track_lap_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["track_lap_id"], name: "index_track_partial_laps_on_track_lap_id"
  end

end
