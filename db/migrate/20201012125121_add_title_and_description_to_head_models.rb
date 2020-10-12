class AddTitleAndDescriptionToHeadModels < ActiveRecord::Migration[6.0]
  def change
    add_column :head_models, :title, :string
    add_column :head_models, :desc, :string
  end
end
