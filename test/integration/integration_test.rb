require "application_system_test_case"

class IntegrationTest < ApplicationSystemTestCase
  test "Integration Testing" do
    visit new_user_session_path
    fill_in "Email", with: "test5@test.com"
    fill_in "Password", with: "123456"
    click_on "Log in"

    assert_text "Invalid Email or password."

    visit new_user_registration_path
    fill_in "Username", with: "HawkEye865"
    fill_in "Email", with: "test5@test.com"
    fill_in "Password", with: "123456"

    click_on "Sign up"
    sleep 2
    assert_text "Welcome! You have signed up successfully."

    click_on "HawkEye865"
    click_on "SIGN OUT"
    sleep 2
    assert_text "Signed out successfully."

    click_on "SIGN UP"
    fill_in "Username", with: "HawkEye8652"
    fill_in "Email", with: "test5@test.com"
    fill_in "Password", with: "123456"

    click_on "Sign up"
    assert_text "Please review the problems below:"

    click_on "SIGN UP"
    fill_in "Username", with: "HawkEye8652"
    fill_in "Email", with: "test6@test.com"
    fill_in "Password", with: "123456"

    click_on "Sign up"
    sleep 2
    assert_text "Welcome! You have signed up successfully."

    click_on "HawkEye8652"
    click_on "SIGN OUT"
    sleep 2
    assert_text "Signed out successfully."

    click_on "LOG IN"
    fill_in "Email", with: "test5@test.com"
    fill_in "Password", with: "123456"

    click_on "Log in"
    sleep 2
    assert_text "Signed in successfully."

    visit toys_url
    assert_selector "h1", text: "Plushies"

    click_on "Create Plushie"
    sleep 2
    find('#Head').click
    click_on "head1"
    find('#Left-Arm').click
    click_on "l_arm1"
    find('#Right-Arm').click
    click_on "r_arm1"
    find('#Torso').click
    click_on "body1"
    find('#Left-Leg').click
    click_on "l_leg1"
    find('#Right-Leg').click
    click_on "r_leg1"
    find(:css, "#toy_shared[value='1']").set(true)
    fill_in "Name", with: "Test"

    click_on "Create Plushie"
    sleep 2
    assert_text "Plushie successfully created"

    click_on "Edit"
    sleep 2
    find('#Head').click
    click_on "head0"
    find('#Left-Arm').click
    click_on "l_arm0"
    find('#Right-Arm').click
    click_on "r_arm0"
    find('#Torso').click
    click_on "body0"
    find('#Left-Leg').click
    click_on "l_leg0"
    find('#Right-Leg').click
    click_on "r_leg0"
    check("Share")
    fill_in "Name", with: "Test"

    click_on "Update Plushie"
    assert_text "Plushie was successfully updated."

    fill_in "Description", with: "Gundam is the best. Screw Transformers!!!!!!!!!!!!!"
    
    click_on "Rate"
    assert_text  "Your rating has been saved."

    click_on "edit-r"

    click_on "Update Rating"
    assert_text  "Your rating has been updated."

    page.accept_confirm do
      click_on "delete-r"
    end
    assert_no_text "Your rating has been removed."

    click_on "Edit"
    sleep 2
    click_on "animal"
    click_on "fish"
    click_on "animal"

    click_on "Update Plushie"
    assert_text "Plushie was successfully updated."

    click_on "HawkEye865"
    click_on "SIGN OUT"

    assert_text "Signed out successfully."

    click_on "LOG IN"
    fill_in "Email", with: "test6@test.com"
    fill_in "Password", with: "123456"

    click_on "Log in"
    sleep 2
    assert_text "Signed in successfully."

    visit toys_url
    assert_selector "h1", text: "Plushies"

    click_on "Test"
    sleep 2
    click_on "Copy"
    fill_in "Name", with: "Tes2"

    click_on "Create Plushie"
    sleep 2
    assert_text "Plushie successfully created"

    page.accept_confirm do
      click_on "delete-p"
    end
    assert_text "Plushie was successfully destroyed."

    visit toys_url
    assert_selector "h1", text: "Plushies"

    click_on "download-pdf"
    assert true
    
    sleep 3
    # window = page.driver.browser.window_handles
    # page.driver.browser.switch_to.window(window.last)
    # page.driver.browser.close
    # page.driver.browser.switch_to.window(window.first)
  end
end
