class CreatePaymentInformations < ActiveRecord::Migration[6.0]
  def change
    create_table :payment_informations do |t|
      t.string :ch_name
      t.string :ch_surname
      t.integer :cell_no
      t.string :payment_method
      t.string :card_no
      t.integer :expiration_month
      t.integer :expiration_year
      t.string :security_code
      t.string :address_line1
      t.string :address_line2
      t.string :city
      t.string :postal_code
      t.string :country

      t.timestamps
    end
  end
end
