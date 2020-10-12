class AddTitleAndDescriptionToRArmModels < ActiveRecord::Migration[6.0]
  def change
    add_column :r_arm_models, :title, :string
    add_column :r_arm_models, :desc, :string
  end
end
