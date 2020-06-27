# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_27_125209) do

  create_table "ratings", force: :cascade do |t|
    t.text "description"
    t.decimal "value"
    t.integer "user_id", null: false
    t.integer "toy_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["toy_id"], name: "index_ratings_on_toy_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "toys", force: :cascade do |t|
    t.string "name"
    t.integer "head"
    t.integer "arms"
    t.integer "torso"
    t.integer "legs"
    t.decimal "rating"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.float "head_pos"
    t.float "head_posx"
    t.float "torso_posy"
    t.float "torso_posx"
    t.float "larm_posy"
    t.float "larm_posx"
    t.float "rarm_posy"
    t.float "rarm_posx"
    t.float "lleg_posy"
    t.float "lleg_posx"
    t.float "rleg_posy"
    t.float "rleg_posx"
    t.boolean "shared"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "username", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "ratings", "toys"
  add_foreign_key "ratings", "users"
end
