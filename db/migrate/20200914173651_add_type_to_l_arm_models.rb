class AddTypeToLArmModels < ActiveRecord::Migration[6.0]
  def change
    add_column :l_arm_models, :model_type, :integer
  end
end
