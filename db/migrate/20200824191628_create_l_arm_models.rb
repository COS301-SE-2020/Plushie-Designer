class CreateLArmModels < ActiveRecord::Migration[6.0]
  def change
    create_table :l_arm_models do |t|
      t.string :l_arm_file
      t.string :tp

      t.timestamps
    end
  end
end
