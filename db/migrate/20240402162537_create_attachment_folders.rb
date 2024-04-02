class CreateAttachmentFolders < ActiveRecord::Migration[7.1]
  def change
    create_table :attachment_folders do |t|
      t.string :name
      t.bigint :record_id
      t.string :record_type
      t.timestamps
    end
  end
end
