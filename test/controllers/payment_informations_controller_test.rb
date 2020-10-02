require 'test_helper'

class PaymentInformationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @payment_information = payment_informations(:one)
  end

  test "should get index" do
    get payment_informations_url
    assert_response :success
  end

  test "should get new" do
    get new_payment_information_url
    assert_response :success
  end

  test "should create payment_information" do
    assert_difference('PaymentInformation.count') do
      post payment_informations_url, params: { payment_information: { address_line1: @payment_information.address_line1, address_line2: @payment_information.address_line2, card_no: @payment_information.card_no, cell_no: @payment_information.cell_no, ch_name: @payment_information.ch_name, ch_surname: @payment_information.ch_surname, city: @payment_information.city, country: @payment_information.country, expiration_month: @payment_information.expiration_month, expiration_year: @payment_information.expiration_year, payment_method: @payment_information.payment_method, postal_code: @payment_information.postal_code, security_code: @payment_information.security_code } }
    end

    assert_redirected_to payment_information_url(PaymentInformation.last)
  end

  test "should show payment_information" do
    get payment_information_url(@payment_information)
    assert_response :success
  end

  test "should get edit" do
    get edit_payment_information_url(@payment_information)
    assert_response :success
  end

  test "should update payment_information" do
    patch payment_information_url(@payment_information), params: { payment_information: { address_line1: @payment_information.address_line1, address_line2: @payment_information.address_line2, card_no: @payment_information.card_no, cell_no: @payment_information.cell_no, ch_name: @payment_information.ch_name, ch_surname: @payment_information.ch_surname, city: @payment_information.city, country: @payment_information.country, expiration_month: @payment_information.expiration_month, expiration_year: @payment_information.expiration_year, payment_method: @payment_information.payment_method, postal_code: @payment_information.postal_code, security_code: @payment_information.security_code } }
    assert_redirected_to payment_information_url(@payment_information)
  end

  test "should destroy payment_information" do
    assert_difference('PaymentInformation.count', -1) do
      delete payment_information_url(@payment_information)
    end

    assert_redirected_to payment_informations_url
  end
end
