class CreateDrumPatterns < ActiveRecord::Migration[7.1]
  def change
    create_table :drum_patterns do |t|
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
