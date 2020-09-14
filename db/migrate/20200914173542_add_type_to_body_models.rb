class AddTypeToBodyModels < ActiveRecord::Migration[6.0]
  def change
    add_column :body_models, :model_type, :integer
  end
end
