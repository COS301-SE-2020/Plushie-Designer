class AddHeadPosToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :head_pos, :float
  end
end
