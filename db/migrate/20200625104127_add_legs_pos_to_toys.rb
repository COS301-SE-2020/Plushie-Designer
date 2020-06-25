class AddLegsPosToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :lleg_posy, :float
    add_column :toys, :lleg_posx, :float
    add_column :toys, :rleg_posy, :float
    add_column :toys, :rleg_posx, :float
  end
end
