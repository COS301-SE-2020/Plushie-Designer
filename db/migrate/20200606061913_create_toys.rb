class CreateToys < ActiveRecord::Migration[6.0]
  def change
    create_table :toys do |t|
      t.string :name
      t.integer :head
      t.integer :arms
      t.integer :torso
      t.integer :legs
      t.decimal :rating

      t.timestamps
    end
  end
end
