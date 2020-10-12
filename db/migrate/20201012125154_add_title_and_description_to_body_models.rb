class AddTitleAndDescriptionToBodyModels < ActiveRecord::Migration[6.0]
  def change
    add_column :body_models, :title, :string
    add_column :body_models, :desc, :string
  end
end
