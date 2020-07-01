class AddImageToToys < ActiveRecord::Migration[6.0]
  def change
    add_column :toys, :image, :text
  end
end
