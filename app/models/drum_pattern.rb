class DrumPattern < ApplicationRecord
  belongs_to :project
  has_many :drum_pattern_tracks, class_name: "DrumPattern::Track", dependent: :destroy
end
