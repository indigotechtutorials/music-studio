class DrumPattern < ApplicationRecord
  belongs_to :project
  has_many_attached :files
end
