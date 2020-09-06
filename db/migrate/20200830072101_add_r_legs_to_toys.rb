class AddRLegsToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :r_leg, :integer
  end
end
