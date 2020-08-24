class CreateRLegModels < ActiveRecord::Migration[6.0]
  def change
    create_table :r_leg_models do |t|
      t.string :r_leg_file
      t.string :tp

      t.timestamps
    end
  end
end
