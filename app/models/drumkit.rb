class Drumkit < ApplicationRecord
  belongs_to :user
  has_many :attachment_folders, as: :record, dependent: :destroy
  def main_folder
    attachment_folders.first
  end
end
