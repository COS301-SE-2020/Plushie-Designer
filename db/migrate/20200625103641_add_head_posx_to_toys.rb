class AddHeadPosxToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :head_posx, :float
  end
end
