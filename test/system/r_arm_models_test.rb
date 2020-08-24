require "application_system_test_case"

class RArmModelsTest < ApplicationSystemTestCase
  setup do
    @r_arm_model = r_arm_models(:one)
  end

  test "visiting the index" do
    visit r_arm_models_url
    assert_selector "h1", text: "R Arm Models"
  end

  test "creating a R arm model" do
    visit r_arm_models_url
    click_on "New R Arm Model"

    fill_in "R arm file", with: @r_arm_model.r_arm_file
    fill_in "Tp", with: @r_arm_model.tp
    click_on "Create R arm model"

    assert_text "R arm model was successfully created"
    click_on "Back"
  end

  test "updating a R arm model" do
    visit r_arm_models_url
    click_on "Edit", match: :first

    fill_in "R arm file", with: @r_arm_model.r_arm_file
    fill_in "Tp", with: @r_arm_model.tp
    click_on "Update R arm model"

    assert_text "R arm model was successfully updated"
    click_on "Back"
  end

  test "destroying a R arm model" do
    visit r_arm_models_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "R arm model was successfully destroyed"
  end
end
