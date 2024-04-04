class CreateDrumPatternTracks < ActiveRecord::Migration[7.1]
  def change
    create_table :drum_pattern_tracks do |t|
      t.text :note_data

      t.timestamps
    end
  end
end
