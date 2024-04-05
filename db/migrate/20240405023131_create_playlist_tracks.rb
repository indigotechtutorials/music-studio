class CreatePlaylistTracks < ActiveRecord::Migration[7.1]
  def change
    create_table :playlist_tracks do |t|
      t.belongs_to :project, null: false, foreign_key: true
      t.belongs_to :drum_pattern, null: false, foreign_key: true
      t.integer :track_index

      t.timestamps
    end
  end
end
