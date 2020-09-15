class AddRArmImageToRArmModels < ActiveRecord::Migration[6.0]
  def change
    add_column :r_arm_models, :r_arm_image, :string
  end
end
