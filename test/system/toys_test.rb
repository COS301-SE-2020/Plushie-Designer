require "application_system_test_case"

class ToysTest < ApplicationSystemTestCase
  test "doing everything" do
    visit new_user_registration_path
    fill_in "Username", with: "HawkEye865"
    fill_in "Email", with: "test5@test.com"
    fill_in "Password", with: "123456"

    click_on "Sign up"
    assert_text "Welcome! You have signed up successfully."

    visit toys_url

    click_on "Create Plushie"

    fill_in "Arms", with: 1
    fill_in "Head", with: 1
    fill_in "Legs", with: 1
    fill_in "Name", with: "Test"
    fill_in "Rating", with: 1.5
    fill_in "Torso", with: 1
    click_on "Share"

    assert_text "Toy was successfully created"

    click_on "Edit"

    fill_in "Arms", with: 0
    fill_in "Head", with: 0
    fill_in "Legs", with: 0
    fill_in "Name", with: "Test"
    fill_in "Rating", with: 0.5
    fill_in "Torso", with: 0
    click_on "Share"

    assert_text "Toy was successfully updated."

    page.accept_confirm do
      click_on "Delete"
    end
    
    assert_text "Toy was successfully destroyed."
  end
end
