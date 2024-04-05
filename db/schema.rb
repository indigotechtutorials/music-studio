# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_05_044923) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "attachment_files", force: :cascade do |t|
    t.bigint "attachment_folder_id", null: false
    t.string "filename"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attachment_folder_id"], name: "index_attachment_files_on_attachment_folder_id"
  end

  create_table "attachment_folders", force: :cascade do |t|
    t.string "name"
    t.bigint "record_id"
    t.string "record_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "drum_pattern_tracks", force: :cascade do |t|
    t.text "note_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "drum_pattern_id", null: false
    t.index ["drum_pattern_id"], name: "index_drum_pattern_tracks_on_drum_pattern_id"
  end

  create_table "drum_patterns", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_drum_patterns_on_project_id"
  end

  create_table "drumkits", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_drumkits_on_user_id"
  end

  create_table "playlist_tracks", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "drum_pattern_id", null: false
    t.integer "track_index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "playlist_position"
    t.index ["drum_pattern_id"], name: "index_playlist_tracks_on_drum_pattern_id"
    t.index ["project_id"], name: "index_playlist_tracks_on_project_id"
  end

  create_table "projects", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "bpm", default: 120
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "attachment_files", "attachment_folders"
  add_foreign_key "drum_pattern_tracks", "drum_patterns"
  add_foreign_key "drum_patterns", "projects"
  add_foreign_key "drumkits", "users"
  add_foreign_key "playlist_tracks", "drum_patterns"
  add_foreign_key "playlist_tracks", "projects"
  add_foreign_key "projects", "users"
end
