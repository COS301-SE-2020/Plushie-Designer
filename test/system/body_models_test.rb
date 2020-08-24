require "application_system_test_case"

class BodyModelsTest < ApplicationSystemTestCase
  setup do
    @body_model = body_models(:one)
  end

  test "visiting the index" do
    visit body_models_url
    assert_selector "h1", text: "Body Models"
  end

  test "creating a Body model" do
    visit body_models_url
    click_on "New Body Model"

    fill_in "Body file", with: @body_model.body_file
    fill_in "Tp", with: @body_model.tp
    click_on "Create Body model"

    assert_text "Body model was successfully created"
    click_on "Back"
  end

  test "updating a Body model" do
    visit body_models_url
    click_on "Edit", match: :first

    fill_in "Body file", with: @body_model.body_file
    fill_in "Tp", with: @body_model.tp
    click_on "Update Body model"

    assert_text "Body model was successfully updated"
    click_on "Back"
  end

  test "destroying a Body model" do
    visit body_models_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Body model was successfully destroyed"
  end
end
