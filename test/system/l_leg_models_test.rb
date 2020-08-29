require "application_system_test_case"

class LLegModelsTest < ApplicationSystemTestCase
  setup do
    @l_leg_model = l_leg_models(:one)
  end

  test "visiting the index" do
    visit l_leg_models_url
    assert_selector "h1", text: "L Leg Models"
  end

  test "creating a L leg model" do
    visit l_leg_models_url
    click_on "New L Leg Model"

    fill_in "L leg file", with: @l_leg_model.l_leg_file
    fill_in "Tp", with: @l_leg_model.tp
    click_on "Create L leg model"

    assert_text "L leg model was successfully created"
    click_on "Back"
  end

  test "updating a L leg model" do
    visit l_leg_models_url
    click_on "Edit", match: :first

    fill_in "L leg file", with: @l_leg_model.l_leg_file
    fill_in "Tp", with: @l_leg_model.tp
    click_on "Update L leg model"

    assert_text "L leg model was successfully updated"
    click_on "Back"
  end

  test "destroying a L leg model" do
    visit l_leg_models_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "L leg model was successfully destroyed"
  end
end
