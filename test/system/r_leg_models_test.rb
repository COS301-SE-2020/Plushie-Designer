require "application_system_test_case"

class RLegModelsTest < ApplicationSystemTestCase
  setup do
    @r_leg_model = r_leg_models(:one)
  end

  test "visiting the index" do
    visit r_leg_models_url
    assert_selector "h1", text: "R Leg Models"
  end

  test "creating a R leg model" do
    visit r_leg_models_url
    click_on "New R Leg Model"

    fill_in "R leg file", with: @r_leg_model.r_leg_file
    fill_in "Tp", with: @r_leg_model.tp
    click_on "Create R leg model"

    assert_text "R leg model was successfully created"
    click_on "Back"
  end

  test "updating a R leg model" do
    visit r_leg_models_url
    click_on "Edit", match: :first

    fill_in "R leg file", with: @r_leg_model.r_leg_file
    fill_in "Tp", with: @r_leg_model.tp
    click_on "Update R leg model"

    assert_text "R leg model was successfully updated"
    click_on "Back"
  end

  test "destroying a R leg model" do
    visit r_leg_models_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "R leg model was successfully destroyed"
  end
end
