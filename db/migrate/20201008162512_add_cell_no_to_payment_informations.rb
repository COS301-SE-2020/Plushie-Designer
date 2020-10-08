class AddCellNoToPaymentInformations < ActiveRecord::Migration[6.0]
  def change
    add_column :payment_informations, :cell_no, :string
  end
end
