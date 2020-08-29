class CreateLLegModels < ActiveRecord::Migration[6.0]
  def change
    create_table :l_leg_models do |t|
      t.string :l_leg_file
      t.string :tp

      t.timestamps
    end
  end
end
