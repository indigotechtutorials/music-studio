class AddPlaylistPositionToPlaylistTracks < ActiveRecord::Migration[7.1]
  def change
    add_column :playlist_tracks, :playlist_position, :integer
  end
end
