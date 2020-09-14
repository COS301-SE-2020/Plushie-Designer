class AddTypeToLLegModels < ActiveRecord::Migration[6.0]
  def change
    add_column :l_leg_models, :model_type, :integer
  end
end
