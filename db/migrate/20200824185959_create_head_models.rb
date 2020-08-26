class CreateHeadModels < ActiveRecord::Migration[6.0]
  def change
    create_table :head_models do |t|
      t.string :head_file

      t.timestamps
    end
  end
end
