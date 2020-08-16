class AddPartUvToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :head_uv, :text
    add_column :toys, :torso_uv, :text
    add_column :toys, :larm_uv, :text
    add_column :toys, :rarm_uv, :text
    add_column :toys, :lleg_uv, :text
    add_column :toys, :rleg_uv, :text
  end
end
