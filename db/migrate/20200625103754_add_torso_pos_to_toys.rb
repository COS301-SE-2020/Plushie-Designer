class AddTorsoPosToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :torso_posy, :float
    add_column :toys, :torso_posx, :float
  end
end
