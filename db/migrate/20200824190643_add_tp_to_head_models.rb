class AddTpToHeadModels < ActiveRecord::Migration[6.0]
  def change
    add_column :head_models, :tp, :string
  end
end
