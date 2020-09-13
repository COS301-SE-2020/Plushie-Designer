class AddTexToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :head_tex, :text
    add_column :toys, :torso_tex, :text
    add_column :toys, :larm_tex, :text
    add_column :toys, :rarm_tex, :text
    add_column :toys, :lleg_tex, :text
    add_column :toys, :rleg_tex, :text
  end
end
