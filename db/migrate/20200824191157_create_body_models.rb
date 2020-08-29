class CreateBodyModels < ActiveRecord::Migration[6.0]
  def change
    create_table :body_models do |t|
      t.string :body_file
      t.string :tp

      t.timestamps
    end
  end
end
