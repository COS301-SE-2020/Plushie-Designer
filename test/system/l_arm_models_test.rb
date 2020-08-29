require "application_system_test_case"

class LArmModelsTest < ApplicationSystemTestCase
  setup do
    @l_arm_model = l_arm_models(:one)
  end

  test "visiting the index" do
    visit l_arm_models_url
    assert_selector "h1", text: "L Arm Models"
  end

  test "creating a L arm model" do
    visit l_arm_models_url
    click_on "New L Arm Model"

    fill_in "L arm file", with: @l_arm_model.l_arm_file
    fill_in "Tp", with: @l_arm_model.tp
    click_on "Create L arm model"

    assert_text "L arm model was successfully created"
    click_on "Back"
  end

  test "updating a L arm model" do
    visit l_arm_models_url
    click_on "Edit", match: :first

    fill_in "L arm file", with: @l_arm_model.l_arm_file
    fill_in "Tp", with: @l_arm_model.tp
    click_on "Update L arm model"

    assert_text "L arm model was successfully updated"
    click_on "Back"
  end

  test "destroying a L arm model" do
    visit l_arm_models_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "L arm model was successfully destroyed"
  end
end
