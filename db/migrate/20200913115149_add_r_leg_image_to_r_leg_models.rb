class AddRLegImageToRLegModels < ActiveRecord::Migration[6.0]
  def change
    add_column :r_leg_models, :r_leg_image, :string
  end
end
