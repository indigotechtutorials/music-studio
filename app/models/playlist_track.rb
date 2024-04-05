class PlaylistTrack < ApplicationRecord
  belongs_to :project
  belongs_to :drum_pattern
end
