class AddTypeToRLegModels < ActiveRecord::Migration[6.0]
  def change
    add_column :r_leg_models, :model_type, :integer
  end
end
