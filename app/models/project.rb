class Project < ApplicationRecord
  belongs_to :user
  has_many :drum_patterns, dependent: :destroy
  has_many :playlist_tracks, dependent: :destroy
end
