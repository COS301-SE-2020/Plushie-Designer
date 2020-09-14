class AddTypeToHeadModels < ActiveRecord::Migration[6.0]
  def change
    add_column :head_models, :model_type, :integer
  end
end
