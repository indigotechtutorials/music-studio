class AddDrumPatternToDrumPatternTracks < ActiveRecord::Migration[7.1]
  def change
    add_reference :drum_pattern_tracks, :drum_pattern, null: false, foreign_key: true
  end
end
