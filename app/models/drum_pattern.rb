class DrumPattern < ApplicationRecord
  belongs_to :project
  has_many :drum_pattern_tracks, class_name: "DrumPattern::Track", dependent: :destroy
  has_many :playlist_tracks, dependent: :destroy

  def index
    project.drum_patterns.pluck(:id).find_index(id) + 1
  end
end
