class AddTitleAndDescriptionToRLegModels < ActiveRecord::Migration[6.0]
  def change
    add_column :r_leg_models, :title, :string
    add_column :r_leg_models, :desc, :string
  end
end
