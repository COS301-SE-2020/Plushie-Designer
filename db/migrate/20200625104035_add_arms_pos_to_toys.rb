class AddArmsPosToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :larm_posy, :float
    add_column :toys, :larm_posx, :float
    add_column :toys, :rarm_posy, :float
    add_column :toys, :rarm_posx, :float
  end
end
