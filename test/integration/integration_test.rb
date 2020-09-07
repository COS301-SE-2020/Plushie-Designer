require "application_system_test_case"

class IntegrationTest < ApplicationSystemTestCase
  test "Integration Testing" do
    visit new_user_registration_path
    fill_in "Username", with: "HawkEye865"
    fill_in "Email", with: "test5@test.com"
    fill_in "Password", with: "123456"

    click_on "Sign up"
    assert_text "Welcome! You have signed up successfully."

    visit toys_url
    assert_selector "h1", text: "Plushies"

    click_on "Create Plushie"

    find('#Head').click
    click_on "headr"
    find('#Left-Arm').click
    click_on "larmr"
    find('#Right-Arm').click
    click_on "rarmr"
    find('#Torso').click
    click_on "torsor"
    find('#Left-Leg').click
    click_on "llegr"
    find('#Right-Leg').click
    click_on "rlegr"
    find(:css, "#toy_shared[value='1']").set(true)
    fill_in "Name", with: "Test"

    click_on "Create Plushie"

    assert_text "Plushie successfully created"

    click_on "Edit"

    find('#Head').click
    click_on "headl"
    find('#Left-Arm').click
    click_on "larml"
    find('#Right-Arm').click
    click_on "rarml"
    find('#Torso').click
    click_on "torsol"
    find('#Left-Leg').click
    click_on "llegl"
    find('#Right-Leg').click
    click_on "rlegl"
    check("Share")
    fill_in "Name", with: "Test"

    click_on "Update Plushie"
    assert_text "Plushie was successfully updated."

    fill_in "Description", with: "Gundam is the best. Screw Transformers!!!!!!!!!!!!!"
    
    click_on "Rate"
    assert_text  "Your rating has been saved."

    click_on "edit-r"

    fill_in "Description", with: "Gundam is the best"

    click_on "Update Rating"
    assert_text  "Your rating has been updated."

    page.accept_confirm do
      click_on "delete-r"
    end
    assert_no_text "Your rating has been removed."

    visit toys_url
    assert_selector "h1", text: "Plushies"

    click_on "DOWNLOAD PDF"
    assert true
    
    # sleep 3
    window = page.driver.browser.window_handles
    page.driver.browser.switch_to.window(window.last)
    page.driver.browser.close
    page.driver.browser.switch_to.window(window.first)

    visit toys_url
    
    click_on "Test"

    page.accept_confirm do
      click_on "delete-p"
    end
    
    assert_text "Plushie was successfully destroyed."
  end
end
