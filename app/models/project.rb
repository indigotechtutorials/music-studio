class Project < ApplicationRecord
  belongs_to :user
  has_many :drum_patterns, dependent: :destroy
end
