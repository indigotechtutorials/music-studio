class Drumkit < ApplicationRecord
  belongs_to :user
  has_many :attachment_folders, as: :record, dependent: :destroy
end
