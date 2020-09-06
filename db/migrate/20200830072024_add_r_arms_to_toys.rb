class AddRArmsToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :r_arm, :integer
  end
end
