class CreateRArmModels < ActiveRecord::Migration[6.0]
  def change
    create_table :r_arm_models do |t|
      t.string :r_arm_file
      t.string :tp

      t.timestamps
    end
  end
end
