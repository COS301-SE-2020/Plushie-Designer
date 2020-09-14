class AddLArmImageToLArmModels < ActiveRecord::Migration[6.0]
  def change
    add_column :l_arm_models, :l_arm_image, :string
  end
end
