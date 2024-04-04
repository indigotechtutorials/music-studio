class DrumPattern::Track < ApplicationRecord
  belongs_to :drum_pattern
  has_one_attached :file
  serialize :note_data, Array, coder: JSON
end
