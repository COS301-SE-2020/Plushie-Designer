require "application_system_test_case"

class HeadModelsTest < ApplicationSystemTestCase
  setup do
    @head_model = head_models(:one)
  end

  test "visiting the index" do
    visit head_models_url
    assert_selector "h1", text: "Head Models"
  end

  test "creating a Head model" do
    visit head_models_url
    click_on "New Head Model"

    fill_in "Head file", with: @head_model.head_file
    click_on "Create Head model"

    assert_text "Head model was successfully created"
    click_on "Back"
  end

  test "updating a Head model" do
    visit head_models_url
    click_on "Edit", match: :first

    fill_in "Head file", with: @head_model.head_file
    click_on "Update Head model"

    assert_text "Head model was successfully updated"
    click_on "Back"
  end

  test "destroying a Head model" do
    visit head_models_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Head model was successfully destroyed"
  end
end
