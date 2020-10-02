json.extract! payment_information, :id, :ch_name, :ch_surname, :cell_no, :payment_method, :card_no, :expiration_month, :expiration_year, :security_code, :address_line1, :address_line2, :city, :postal_code, :country, :created_at, :updated_at
json.url payment_information_url(payment_information, format: :json)
