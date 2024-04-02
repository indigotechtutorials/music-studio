class AttachmentFile < ApplicationRecord
  belongs_to :attachment_folder
  has_one_attached :file
end
