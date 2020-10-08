require "application_system_test_case"

class PaymentInformationsTest < ApplicationSystemTestCase
  setup do
    @payment_information = payment_informations(:one)
  end

  test "visiting the index" do
    visit payment_informations_url
    assert_selector "h1", text: "Payment Informations"
  end

  test "creating a Payment information" do
    visit payment_informations_url
    click_on "New Payment Information"

    fill_in "Address line1", with: @payment_information.address_line1
    fill_in "Address line2", with: @payment_information.address_line2
    fill_in "Card no", with: @payment_information.card_no
    fill_in "Cell no", with: @payment_information.cell_no
    fill_in "Ch name", with: @payment_information.ch_name
    fill_in "Ch surname", with: @payment_information.ch_surname
    fill_in "City", with: @payment_information.city
    fill_in "Country", with: @payment_information.country
    fill_in "Expiration month", with: @payment_information.expiration_month
    fill_in "Expiration year", with: @payment_information.expiration_year
    fill_in "Payment method", with: @payment_information.payment_method
    fill_in "Postal code", with: @payment_information.postal_code
    fill_in "Security code", with: @payment_information.security_code
    click_on "Create Payment information"

    assert_text "Payment information was successfully created"
    click_on "Back"
  end

  test "updating a Payment information" do
    visit payment_informations_url
    click_on "Edit", match: :first

    fill_in "Address line1", with: @payment_information.address_line1
    fill_in "Address line2", with: @payment_information.address_line2
    fill_in "Card no", with: @payment_information.card_no
    fill_in "Cell no", with: @payment_information.cell_no
    fill_in "Ch name", with: @payment_information.ch_name
    fill_in "Ch surname", with: @payment_information.ch_surname
    fill_in "City", with: @payment_information.city
    fill_in "Country", with: @payment_information.country
    fill_in "Expiration month", with: @payment_information.expiration_month
    fill_in "Expiration year", with: @payment_information.expiration_year
    fill_in "Payment method", with: @payment_information.payment_method
    fill_in "Postal code", with: @payment_information.postal_code
    fill_in "Security code", with: @payment_information.security_code
    click_on "Update Payment information"

    assert_text "Payment information was successfully updated"
    click_on "Back"
  end

  test "destroying a Payment information" do
    visit payment_informations_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Payment information was successfully destroyed"
  end
end
