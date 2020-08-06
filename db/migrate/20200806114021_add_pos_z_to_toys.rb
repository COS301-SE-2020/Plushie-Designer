class AddPosZToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :head_posz, :float
    add_column :toys, :torso_posz, :float
    add_column :toys, :larm_posz, :float
    add_column :toys, :rarm_posz, :float
    add_column :toys, :lleg_posz, :float
    add_column :toys, :rleg_posz, :float
  end
end
