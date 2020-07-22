require "application_system_test_case"

class ToysTest < ApplicationSystemTestCase
  test "doing everything" do
    # visit new_user_registration_path
    # fill_in "Username", with: "HawkEye865"
    # fill_in "Email", with: "test5@test.com"
    # fill_in "Password", with: "123456"

    # click_on "Sign up"
    # assert_text "Welcome! You have signed up successfully."

    visit toys_url

    # click_on "Create Plushie"

    # click_on "headr"
    # click_on "armsr"
    # click_on "torsor"
    # click_on "legsr"
    # fill_in "Name", with: "Test"

    # click_on "Share"

    # assert_text "Toy was successfully created"

    # click_on "Edit"

    # click_on "headl"
    # click_on "armsl"
    # click_on "torsol"
    # click_on "legsl"
    # fill_in "Name", with: "Test"
    # click_on "Share"

    # assert_text "Toy was successfully updated."

    # fill_in "Description", with: "Gundam is the best. Screw Transformers!!!!!!!!!!!!!"
    # fill_in "Value", with: 5

    # click_on "leave a rating"
    
    # assert_text  "Your rating has been saved."

    # page.accept_confirm do
    #   click_on "Delete"
    # end
    
    # assert_text "Toy was successfully destroyed."
  end
end
