class AddTitleAndDescriptionToLLegModels < ActiveRecord::Migration[6.0]
  def change
    add_column :l_leg_models, :title, :string
    add_column :l_leg_models, :desc, :string
  end
end
