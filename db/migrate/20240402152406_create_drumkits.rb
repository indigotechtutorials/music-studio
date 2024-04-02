class CreateDrumkits < ActiveRecord::Migration[7.1]
  def change
    create_table :drumkits do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
