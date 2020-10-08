class RemoveCellNoFromPaymentInformations < ActiveRecord::Migration[6.0]
  def change
    remove_column :payment_informations, :cell_no, :integer
  end
end
