class AddBpmToProjects < ActiveRecord::Migration[7.1]
  def change
    add_column :projects, :bpm, :integer, default: 120
  end
end
