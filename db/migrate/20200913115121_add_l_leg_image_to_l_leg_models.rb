class AddLLegImageToLLegModels < ActiveRecord::Migration[6.0]
  def change
    add_column :l_leg_models, :l_leg_image, :string
  end
end
