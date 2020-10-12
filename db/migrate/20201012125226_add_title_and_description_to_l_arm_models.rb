class AddTitleAndDescriptionToLArmModels < ActiveRecord::Migration[6.0]
  def change
    add_column :l_arm_models, :title, :string
    add_column :l_arm_models, :desc, :string
  end
end
