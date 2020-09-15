class AddTypeToRArmModels < ActiveRecord::Migration[6.0]
  def change
    add_column :r_arm_models, :model_type, :integer
  end
end
