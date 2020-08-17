require "application_system_test_case"

class ToysTest < ApplicationSystemTestCase
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

    click_on "headr"
    click_on "armsr"
    click_on "torsor"
    click_on "legsr"
    find(:css, "#toy_shared[value='1']").set(true)
    fill_in "Name", with: "Test"

    click_on "Create Toy"

    assert_text "Toy was successfully created"

    click_on "edit-p"

    click_on "headl"
    click_on "armsl"
    click_on "torsol"
    click_on "legsl"
    check("Share")
    fill_in "Name", with: "Test"

    click_on "Update Toy"
    assert_text "Toy was successfully updated."

    fill_in "Description", with: "Gundam is the best. Screw Transformers!!!!!!!!!!!!!"
    
    click_on "Rate"
    assert_text  "Your rating has been saved."

    click_on "edit-r"

    fill_in "Description", with: "Gundam is the best"
    fill_in "Value", with: 5

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
    
    sleep 6
    window = page.driver.browser.window_handles
    page.driver.browser.switch_to.window(window.last)
    page.driver.browser.close
    page.driver.browser.switch_to.window(window.first)

    visit toys_url
    
    click_on "Test"

    page.accept_confirm do
      click_on "delete-p"
    end
    
    assert_text "Toy was successfully destroyed."
  end
end
