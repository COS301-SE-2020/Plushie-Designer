class AddHeadImageToHeadModels < ActiveRecord::Migration[6.0]
  def change
    add_column :head_models, :head_image, :string
  end
end
