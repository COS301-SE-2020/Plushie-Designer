class AddUserIdToPaymentInformations < ActiveRecord::Migration[6.0]
  def change
    add_column :payment_informations, :user_id, :integer
  end
end
