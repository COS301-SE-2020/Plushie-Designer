class AddSharedToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :shared, :boolean
  end
end
