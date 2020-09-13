class AddBodyImageToBodyModels < ActiveRecord::Migration[6.0]
  def change
    add_column :body_models, :body_image, :string
  end
end
