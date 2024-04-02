class CreateAttachmentFiles < ActiveRecord::Migration[7.1]
  def change
    create_table :attachment_files do |t|
      t.belongs_to :attachment_folder, null: false, foreign_key: true
      t.string :filename

      t.timestamps
    end
  end
end
