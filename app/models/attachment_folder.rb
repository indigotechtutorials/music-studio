class AttachmentFolder < ApplicationRecord
  belongs_to :record, polymorphic: true
  has_many :attachment_folders, as: :record, dependent: :destroy
  has_many :attachment_files, dependent: :destroy
end
